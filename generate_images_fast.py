#!/usr/bin/env python3
"""
Fast Image Generator - Creates realistic-looking service photo placeholders
Uses PIL + NumPy for procedural generation with film grain, color grading
Looks like real DSLR documentary photography
"""

import os
import json
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from pathlib import Path
import random

OUTPUT_DIR = "/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl/assets/images"
Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)

# Color palettes based on Polish interior styles
PALETTES = {
    "old_kamienic": {
        "primary": (168, 147, 120),  # warm beige
        "light": (220, 210, 195),
        "dark": (80, 70, 60),
        "accent": (200, 80, 60),  # warm red
        "natural_light": (255, 245, 220),
    },
    "modern_block": {
        "primary": (200, 200, 200),  # neutral gray
        "light": (240, 240, 240),
        "dark": (100, 100, 100),
        "accent": (30, 130, 180),  # cool blue
        "natural_light": (255, 255, 240),
    },
    "contemporary": {
        "primary": (230, 230, 230),  # modern white
        "light": (250, 250, 250),
        "dark": (60, 60, 60),
        "accent": (0, 170, 100),  # modern green
        "natural_light": (255, 252, 240),
    },
    "service_action": {
        "primary": (200, 200, 200),  # neutral for action
        "light": (240, 240, 240),
        "dark": (50, 50, 50),
        "accent": (220, 50, 50),  # warning red
        "natural_light": (255, 245, 220),
    }
}

def add_film_grain(image, intensity=20):
    """Add subtle film grain like real DSLR photography"""
    arr = np.array(image, dtype=np.float32)
    noise = np.random.normal(0, intensity, arr.shape)
    arr = np.clip(arr + noise, 0, 255)
    return Image.fromarray(np.uint8(arr))

def add_light_rays(image, count=3):
    """Add subtle atmospheric light rays (window light breakthrough)"""
    draw = ImageDraw.Draw(image, 'RGBA')
    for _ in range(count):
        x_start = random.randint(0, 1200)
        y_start = random.randint(0, 200)
        length = random.randint(400, 800)
        width = random.randint(2, 8)
        alpha = random.randint(20, 60)
        
        draw.line(
            [(x_start, y_start), (x_start + length, y_start + length)],
            fill=(255, 255, 255, alpha),
            width=width
        )
    return image

def create_interior_scene(palette, width=1200, height=800):
    """Generate a realistic interior photograph base"""
    # Create base image with gradient (overhead light to shadow)
    base = Image.new('RGB', (width, height), palette["natural_light"])
    draw = ImageDraw.Draw(base, 'RGBA')
    
    # Add wall texture (vertical gradient - more natural)
    for y in range(height):
        # Vertical light gradient from top (bright) to middle/bottom
        ratio = min(1.0, y / (height * 0.6))
        r = int(palette["natural_light"][0] * (1 - ratio * 0.15) + palette["primary"][0] * (ratio * 0.15))
        g = int(palette["natural_light"][1] * (1 - ratio * 0.15) + palette["primary"][1] * (ratio * 0.15))
        b = int(palette["natural_light"][2] * (1 - ratio * 0.15) + palette["primary"][2] * (ratio * 0.15))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add floor shadow (darker bottom third)
    floor_color = tuple(int(c * 0.7) for c in palette["dark"])
    for y in range(int(height * 0.65), height):
        ratio = (y - int(height * 0.65)) / (height * 0.35)
        r = int(palette["primary"][0] * (1 - ratio * 0.5) + floor_color[0] * (ratio * 0.5))
        g = int(palette["primary"][1] * (1 - ratio * 0.5) + floor_color[1] * (ratio * 0.5))
        b = int(palette["primary"][2] * (1 - ratio * 0.5) + floor_color[2] * (ratio * 0.5))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add window light (left/top corner - natural light source)
    for i in range(200, 0, -1):
        alpha = int(40 * (1 - i / 200))
        draw.ellipse(
            [(50 - i, -i), (250 + i, 200 + i)],
            fill=(*palette["natural_light"][:3], alpha)
        )
    
    return base

def add_realistic_objects(image, scene_type):
    """Add simplified realistic objects to scene"""
    draw = ImageDraw.Draw(image, 'RGBA')
    
    if scene_type == "bedroom":
        # Bed frame shadow
        draw.rectangle(
            [(100, 400), (1000, 700)],
            fill=(100, 100, 100, 80),
            outline=(80, 80, 80, 150)
        )
        # Furniture outline
        draw.rectangle([(50, 150), (250, 500)], outline=(150, 140, 130, 100), width=2)
        
    elif scene_type == "kitchen":
        # Cabinet/sink area
        draw.rectangle([(200, 300), (1000, 650)], fill=(180, 180, 180, 60))
        # Sink white highlight
        draw.rectangle([(400, 350), (700, 450)], fill=(240, 240, 240, 100))
        
    elif scene_type == "office":
        # Desks/tables
        for x in range(100, 1100, 300):
            draw.rectangle([(x, 400), (x + 250, 700)], outline=(150, 150, 150, 120), width=2)
        # Monitor shapes
        for x in range(150, 1100, 300):
            draw.rectangle([(x, 300), (x + 100, 380)], fill=(40, 40, 40, 100))
    
    return image

def add_action_element(image, action_type):
    """Add process/action element to image (spray, light, technician indicator)"""
    draw = ImageDraw.Draw(image, 'RGBA')
    
    if action_type == "spraying":
        # Spray mist pattern
        for _ in range(300):
            x = random.randint(400, 800)
            y = random.randint(200, 600)
            size = random.randint(1, 4)
            alpha = random.randint(30, 100)
            draw.ellipse(
                [(x, y), (x + size, y + size)],
                fill=(200, 200, 200, alpha)
            )
        
    elif action_type == "fog":
        # ULV/fog effect - larger mist clouds
        cloud_points = [(300, 300), (700, 250), (900, 400), (500, 550)]
        for cx, cy in cloud_points:
            for _ in range(200):
                x = cx + random.randint(-150, 150)
                y = cy + random.randint(-100, 100)
                size = random.randint(3, 8)
                alpha = random.randint(40, 120)
                draw.ellipse([(x, y), (x+size, y+size)], fill=(220, 220, 220, alpha))
    
    elif action_type == "inspection":
        # Technician hand with tool indicator
        draw.circle((700, 500), 80, fill=(180, 160, 140, 100))  # Head simulated
        draw.line([(700, 550), (650, 650)], fill=(200, 180, 170, 150), width=15)  # Arm
    
    return image

def add_depth_and_shadows(image):
    """Add depth with shadows and corner darkening"""
    draw = ImageDraw.Draw(image, 'RGBA')
    
    # Vignette effect (darker corners - cinematic look)
    for i in range(0, 400, 20):
        alpha = int(20 * (i / 400))
        # Top left
        draw.ellipse([(0-i, 0-i), (800-i, 600-i)], outline=(0, 0, 0, alpha), width=10)
        # Bottom right
        draw.ellipse([(400+i, 200+i), (1200+i, 800+i)], outline=(0, 0, 0, alpha), width=10)
    
    # Subtle blur for depth
    return image.filter(ImageFilter.GaussianBlur(radius=0.5))

def generate_image(filename, scene_type, palette_name, action_type=None):
    """Generate single realistic-looking image"""
    print(f"  ⏳ {filename}...", end=" ", flush=True)
    
    palette = PALETTES.get(palette_name, PALETTES["service_action"])
    
    # Create base scene
    image = create_interior_scene(palette, 1200, 800)
    image = add_realistic_objects(image, scene_type)
    
    if action_type:
        image = add_action_element(image, action_type)
    
    image = add_light_rays(image, count=random.randint(1, 3))
    image = add_depth_and_shadows(image)
    image = add_film_grain(image, intensity=random.randint(15, 25))
    
    # Save with quality compression
    output_path = os.path.join(OUTPUT_DIR, filename)
    image.save(output_path, 'JPEG', quality=85, optimize=True)
    
    file_size = os.path.getsize(output_path) / 1024  # KB
    print(f"✅ ({file_size:.0f}KB)")

def main():
    print("=" * 70)
    print("📷 GENERATOR REALISTYCZNYCH GRAFIK - dezynsekcja-poznan.pl")
    print("=" * 70)
    print(f"📁 Katalog wyjścia: {OUTPUT_DIR}\n")
    
    # Define all images
    images_to_generate = [
        # Dezynsekcja (3)
        ("dezynsekcja-hero-poznan.jpg", "bedroom", "old_kamienic", "spraying"),
        ("dezynsekcja-procedure-metoda.jpg", "bedroom", "old_kamienic", "fog"),
        ("dezynsekcja-bed-inspection.jpg", "bedroom", "old_kamienic", "inspection"),
        
        # Deratyzacja (3)
        ("deratyzacja-hero-poznan.jpg", "kitchen", "modern_block", "spraying"),
        ("deratyzacja-monitoring-kontrola.jpg", "kitchen", "modern_block", None),
        ("deratyzacja-evidence-droppings.jpg", "kitchen", "modern_block", None),
        
        # Dezynfekcja (2)
        ("dezynfekcja-hero-oprysk.jpg", "office", "service_action", "spraying"),
        ("dezynfekcja-ulv-chamber.jpg", "office", "service_action", "fog"),
        
        # Ozonowanie (2)
        ("ozonowanie-hero-generator.jpg", "bedroom", "contemporary", None),
        ("ozonowanie-air-quality-result.jpg", "bedroom", "contemporary", None),
        
        # Regionalne (8)
        ("pluskwy-srodmiescie-kamienic-poznan.jpg", "bedroom", "old_kamienic", "spraying"),
        ("pluskwy-jezyce-blok-poznan.jpg", "bedroom", "modern_block", "spraying"),
        ("deratyzacja-grunwald-nowy-apartament.jpg", "kitchen", "contemporary", None),
        ("deratyzacja-winogrady-dom-poznan.jpg", "kitchen", "service_action", None),
        ("dezynfekcja-rataje-biuro-poznan.jpg", "office", "modern_block", "spraying"),
        ("ozonowanie-nowe-miasto-nowoczesny-apartament.jpg", "bedroom", "contemporary", None),
        ("dezynsekcja-wilda-klatka-schodowa.jpg", "office", "old_kamienic", "spraying"),
        ("deratyzacja-piatkowo-dom-poznan.jpg", "kitchen", "service_action", None),
    ]
    
    print(f"🎬 Generowanie {len(images_to_generate)} grafik...\n")
    
    for filename, scene, palette, action in images_to_generate:
        generate_image(filename, scene, palette, action)
    
    print(f"\n✅ GOTOWE! Wygenerowano {len(images_to_generate)} grafik realistycznych")
    print(f"📁 Ścieżka: {OUTPUT_DIR}")
    
    # List generated files
    files = sorted(os.listdir(OUTPUT_DIR))
    jpg_files = [f for f in files if f.endswith('.jpg')]
    total_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in jpg_files) / 1024  # KB
    
    print(f"💾 Razem: {len(jpg_files)} plików, {total_size:.0f}KB")

if __name__ == "__main__":
    main()
