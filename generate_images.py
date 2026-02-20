#!/usr/bin/env python3
"""
FLUX 1.0 Image Generator for dezynsekcja-poznan.pl
Generates 19 photorealistic service documentation images
Used with Flux 1.0 API or local installation
"""

import os
import json
import requests
from pathlib import Path
import time

# Configuration
OUTPUT_DIR = "/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl/assets/images"
IMAGE_SPECS = {
    "width": 1200,
    "height": 800,
    "format": "jpg",
    "quality": 95,
    "model": "flux-1-pro",  # Use "flux-1" for faster, less detailed
}

# Define all 19 images with prompts
IMAGES = [
    {
        "filename": "dezynsekcja-hero-poznan.jpg",
        "alt": "Technician w białym kombinezonie opryskuje pluskwy z rozpylacza w poznańskim mieszkaniu",
        "prompt": "Professional pest control technician in white protective suit, wearing respirator mask and gloves, spraying insecticide on bedroom bedframe corner using handheld sprayer. Bright natural sunlight from window illuminates dust particles in air. Bedroom interior: double bed, nightstand, wooden floor. Photo has slight grainy texture like documentary photography. Canon 5D Mark IV style photo. 16-bit color depth, natural color grading, shadows from window creating depth. Location: Poznań apartment, typical Polish bedroom architecture. Professional reportage photography style. Shot at 50mm, f/2.8, natural window light + work lamp. No watermarks, no branding visible on equipment.",
    },
    {
        "filename": "dezynsekcja-procedure-metoda.jpg",
        "alt": "Generator ULV tworzy mgłę owadobójczą w odławianym rogu sypialni",
        "prompt": "Close-up of ULV (ultra-low volume) sprayer device during bedroom disinfection. Technician's gloved hand holding white/grey fog generator nozzle, creating visible mist cloud reaching into wall crevices and under furniture. Apartment interior blurred in background. Focus on technique: fog penetration into corners, under bed frame, electrical outlets. Natural diffused light. Documentary photography, professional pest control service execution. Technical precision visible. Dust particles illuminated by side light. 1200x800px composition. Film grain subtle. Canon 6D or similar DSLR quality.",
    },
    {
        "filename": "dezynsekcja-bed-inspection.jpg",
        "alt": "Inspektor sprawdza szwy materaca latarką w poszukiwaniu śladów pluskiew",
        "prompt": "Technician inspecting mattress seams with flashlight for bed bugs during apartment inspection. Technician wearing dark blue/beige protective uniform, crouching beside bed, examining with magnifying glass and LED flashlight. Mattress corner close-up visible. Bedroom: typical Polish flat, parquet floor, warm interior lighting. Realistic indoor photography. Documentary style. Professional service photo. Natural colors, slight underexposure compensated by work lamp. Professional macro-like detail showing inspection protocol. No harsh shadows. Photojournalism quality. Service documentation style.",
    },
    {
        "filename": "deratyzacja-hero-poznan.jpg",
        "alt": "Technician instaluje staację deratyzacyjną pod zlewem w poznańskiej kuchni",
        "prompt": "Professional pest control technician installing rat bait station in apartment kitchen corner. Technician in protective uniform crouching, placing locked bait station (solid plastic, dark gray, tamper-proof design) under kitchen sink. Kitchen blurred background: sink, white cabinets, typical Polish kitchen. Natural light from window. Technician focused on precise installation point - corner where wall meets baseboard. Protective gloves visible. Documentary photography of real pest control service. Canon 5D Mark IV style, natural color balance, professional reportage. 16-bit photography quality. Dust motes visible in natural light. Professional but authentic atmosphere.",
    },
    {
        "filename": "deratyzacja-monitoring-kontrola.jpg",
        "alt": "Kontrola spożycia w deratyzacyjnej stacji monitoringowej - dokumentacja usługi",
        "prompt": "Close-up of technician's hand opening tamper-proof bait station to check consumption level. Station mounted on wall, technician holding clipboard/inspection form noting data. Realistic bait station design: solid plastic with mechanical lock, no visible food debris (clean installation). Interior apartment background (basement or utility room - damp atmosphere). Natural/LED light. Professional monitoring procedure. Documentary film photography style. Technical precision. Shadows from overhead utility light. Service documentation photo. No logo branding visible.",
    },
    {
        "filename": "deratyzacja-evidence-droppings.jpg",
        "alt": "Ślady fecesów myszy wzdłuż listwy bazowej - dowód infestacji w mieszkaniu",
        "prompt": "Technician pointing to mouse droppings trail on white/gray apartment baseboard with pencil or small inspection tool. Droppings small, dark, scattered along wall-floor junction. Technician wearing blue latex glove, professional uniform. Apartment interior detail: wooden baseboard, concrete floor or terracotta tiles. Natural window light creating detailed visibility. Close-up photography showing infestation evidence. Documentary inspection photo. Professional but authentic. Film grain visible. Macro photography style. 1200x800 with droppings in focus, technician hand anchoring composition.",
    },
    {
        "filename": "dezynfekcja-hero-oprysk.jpg",
        "alt": "Pracownik w białym kombinezonie opryskuje biuro liśćmi owadobójczymi - dezynfekcja pomieszczeń",
        "prompt": "Technician in full protective equipment (white suit, N95 mask, clear face shields, gloves) spraying disinfectant on office workplace desks and surfaces using backpack sprayer (2L pressure tank). High-pressure spray creating visible mist coating surfaces. Modern office interior: desks, chairs, computer equipment (monitors without brand visibility), white walls. Afternoon natural light from window + artificial office lighting. Professional disinfection service documentation. Canon 6D photo quality. Natural color grading. Dust and spray particles illuminated. Professional hygiene service execution. Film photography aesthetic. No harsh shadows, balanced exposure.",
    },
    {
        "filename": "dezynfekcja-ulv-chamber.jpg",
        "alt": "Generator ULV tworzy rozprysk dezynfekcyjny w małym pokoju - mgła rozsiewająca się po pomieszzczeniu",
        "prompt": "ULV (ultra-low volume) generator machine during disinfection of small office room or apartment living space. Machine in corner emitting visible thermal fog cloud dispersing through room. Interior space: chairs, table, minimal furniture pushed to sides. Room filled with fine mist particles, atmospheric lighting showing fog penetration. Technician present but blurred in background, maintaining safety distance. Documentary service execution photo. Professional pest control equipment. Natural color palette, cool lighting (fog appears white/gray). 1200x800 composition emphasizing fog distribution and room coverage. Film photography quality.",
    },
    {
        "filename": "ozonowanie-hero-generator.jpg",
        "alt": "Generator ozonu w poznańskim apartamencie - ozonowanie do eliminacji zapachów i bakterii",
        "prompt": "Professional ozone generator device (compact desktop model, beige/white color, no branding visible) positioned in center of residential room demonstrating ozone treatment procedure. Device activated with visible operation indicator (subtle glow or LED). Room interior: typical Polish apartment living room, sofa, curtains, windows closed (safety protocol visible). Apartment is empty (no people/pets visible - safety requirement). Natural late afternoon window light. Technician absent to show automated treatment. Documentary photography of ozonation setup. 1200x800 composition. Film grain like Sony A7R. Professional equipment documentation. No artificial highlights. Realistic residential interior.",
    },
    {
        "filename": "ozonowanie-air-quality-result.jpg",
        "alt": "Świeżość i czystość powietrza po ozonowaniu - apartament wietrzony, jasne naturalne światło",
        "prompt": "After-ozonation scene: apartment window open for ventilation, natural sunlight streaming through (bright, fresh lighting), empty room showing clean atmosphere, transparent/clear air (no visible odors or haze). Room interior: living room with typical furniture, curtains, wooden floor - all appearing fresh and clean. Contrast to previous treatment: brightness and clarity indicating successful treatment completion. Technician checking air quality with portable meter (small hand-held device, professional type) - face/details blurred. Documentary service completion photo. 1200x800 composition with sunlight as key element. Film photography, natural colors, professional result documentation.",
    },
    {
        "filename": "pluskwy-srodmiescie-kamienic-poznan.jpg",
        "alt": "Opryskiwanie obudowy grzejnika w starej poznańskiej kamienicy śródmieścia - typowa architektura XIX wieku",
        "prompt": "Historic Poznań downtown apartment interior - typical Śródmieskie kamienic (19th century tenement house architecture). High 3-meter ceiling, ornate crown molding, wooden parquet floor, large sash windows overlooking historic street. Technician in white suit spraying insecticide behind radiator and trim molding (common pluskwy hideout in old buildings). Sun from window illuminates dust particles and atmospheric perspective of room. Close-up detail of bed corner showing documentation of treatment location. Documentary photo of service in historic downtown Poznań apartment. Film photography style, natural colors. Visible architectural details showing age of building.",
    },
    {
        "filename": "pluskwy-jezyce-blok-poznan.jpg",
        "alt": "Zabieg dezynsekcji w typowym blokowiskakim mieszkaniu dzielnicy Jeżyce - funkcjonalne wnętrze z lat 80",
        "prompt": "Jeżyce district - modern 1970s-80s typical Polish residential block apartment (blokowiski styl). Simple, functional interior: modern furniture, tile/linoleum floor, standard ceiling, minimal decoration. Technician treating built-in wardrobes and bed frame joints - common problem areas in block apartments. Compact living space, efficient layout visible. Afternoon natural light from double window. Documentary service photo. Film grain visible. Professional equipment in functional modern apartment interior. 1200x800 composition. Everyday Polish residential aesthetic.",
    },
    {
        "filename": "deratyzacja-grunwald-nowy-apartament.jpg",
        "alt": "Instalacja monitoringu szczurów w nowoczesnym apartamencie Grunwaldu - nowoczesne wnętrze post-2010",
        "prompt": "Grunwald district - new residential apartment interior (post-2010 construction), modern design elements: open concept kitchen-living area, white walls, contemporary furniture, large windows. Technician installing rodent monitoring station near kitchen appliances and storage areas (modern kitchen setup). Natural LED light from contemporary fixtures. Professional pest control in contemporary apartment. Documentary photography. Clean, minimalist interior showing modern housing standard. Service execution in upscale residential Poznań market. Professional film photography quality.",
    },
    {
        "filename": "deratyzacja-winogrady-dom-poznan.jpg",
        "alt": "Deratyzacja w domku jednorodzinnym Winogrady - zabudowania w piwnicy i strefy wejścia",
        "prompt": "Winogrady district - suburban-style house interior, semi-detached residence. Single-family home characteristics: larger rooms, basement access visible, traditional construction. Technician installing bait stations in utility room/basement area (typical rodent entry points in houses). Concrete basement floor, wooden support posts, storage shelves. Natural light from small window, utility atmosphere. Documentary family home pest control service. Film photography. Professional residential service in suburban Poznań area.",
    },
    {
        "filename": "dezynfekcja-rataje-biuro-poznan.jpg",
        "alt": "Dezynfekcja powierzchni biurowych w Ratajach - opryskiwanie stand-ów pracy i liczników",
        "prompt": "Rataje district - business/mixed-use space interior (typical of this commercial-residential district). Small office or retail space, professional environment. Technician performing disinfection of workspace: desks, shared surfaces, sales counter area. Contemporary commercial interior, bright artificial lighting, organized workspace. Documentary service photo. Film photography of professional disinfection in business setting. 1200x800 composition showing service execution in commercial environment. Polish business district aesthetic.",
    },
    {
        "filename": "ozonowanie-nowe-miasto-nowoczesny-apartament.jpg",
        "alt": "Ozonowanie nowoczesnego apartamentu w Nowym Mieście - procedura czyszczenia powietrza w nowej zabudowie",
        "prompt": "Nowe Miasto district - new residential development apartment, modern architectural design. Large windows, contemporary finishes, open plan living. Ozone generator positioned in fresh apartment showing treatment of new/renovated spaces. Modern interior fully utilized for space demonstration. Bright natural light emphasizing clean contemporary design. Documentary photo of ozonation service in modern housing development. Film photography. Professional result documentation in premium residential Poznań market segment.",
    },
    {
        "filename": "dezynsekcja-wilda-klatka-schodowa.jpg",
        "alt": "Opryskiwanie wspólnej klatki schodowej w Wildzie - zabezpieczenie budynku wielorodzinnego",
        "prompt": "Wilda district - older-style apartment building corridor, communal areas. Technician treating shared residential space: hallway, staircase, building entrance area (common pest entry points in multi-family buildings). Building interior shows age and typical maintenance level of Wilda district housing. Natural light from doorway/windows. Documentary evidence of service in shared building infrastructure. Film photography style. Professional service preventing pest spread in residential building. 1200x800 composition emphasizing communal responsibility.",
    },
    {
        "filename": "deratyzacja-piatkowo-dom-poznan.jpg",
        "alt": "Kompleksowa deratyzacja domu rodzinnego w Piątkowie - strategiczne umieszczenie stacji monitoringowych",
        "prompt": "Piątkowo district - spacious family apartment or small house interior, residential setting. Technician conducting comprehensive rodent monitoring setup - multiple stations installed in strategic locations throughout residence. Larger living space compared to downtown apartments, family home atmosphere. Natural lighting throughout. Documentary comprehensive pest control service. Film photography quality. 1200x800 composition showing full-home service scope in suburban Poznań area.",
    },
]

def check_dependencies():
    """Check if required packages are installed"""
    print("🔍 Sprawdzanie zależności...")
    try:
        import httpx
        print("✅ httpx dostępny")
    except ImportError:
        print("⚠️  httpx nie zainstalowany - spróbuję zainstalować...")
        os.system("pip install httpx")

def generate_with_flux_api(prompt, filename):
    """Generate image using Flux 1.0 API (requires API key)"""
    api_key = os.getenv("FLUX_API_KEY")
    if not api_key:
        print(f"❌ Brak API klucza dla Flux - ustaw FLUX_API_KEY")
        return False
    
    print(f"📡 Generowanie: {filename}")
    try:
        import httpx
        client = httpx.Client()
        response = client.post(
            "https://api.bfl.ai/v1/flux-pro-1.0",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "prompt": prompt,
                "width": IMAGE_SPECS["width"],
                "height": IMAGE_SPECS["height"],
                "steps": 50,
                "guidance": 7.5,
            }
        )
        if response.status_code == 200:
            image_data = response.json()
            image_url = image_data.get("images")[0]
            img_response = httpx.get(image_url)
            with open(os.path.join(OUTPUT_DIR, filename), 'wb') as f:
                f.write(img_response.content)
            print(f"✅ {filename} wygenerowany")
            return True
        else:
            print(f"❌ Błąd API: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Błąd: {e}")
        return False

def generate_with_local_flux():
    """Generate with local Flux installation"""
    print("🖥️  Próba użycia lokalnego Flux...")
    try:
        from diffusers import FluxPipeline
        import torch
        
        pipe = FluxPipeline.from_pretrained(
            "black-forest-labs/FLUX.1-pro",
            torch_dtype=torch.float16
        )
        pipe.to("cuda")
        
        for image_config in IMAGES:
            print(f"⏳ Generowanie: {image_config['filename']}")
            image = pipe(
                prompt=image_config["prompt"],
                height=IMAGE_SPECS["height"],
                width=IMAGE_SPECS["width"],
                guidance_scale=7.5,
                num_inference_steps=50,
                max_sequence_length=512,
            ).images[0]
            
            image.save(os.path.join(OUTPUT_DIR, image_config["filename"]), quality=95)
            print(f"✅ {image_config['filename']}")
            time.sleep(2)  # Rate limiting
            
        return True
    except Exception as e:
        print(f"❌ Błąd z lokalnym Flux: {e}")
        return False

def create_placeholder():
    """Create placeholder images with metadata if generation fails"""
    print("📝 Tworzenie metadanych i instrukcji...")
    metadata = {
        "project": "dezynsekcja-poznan.pl",
        "generation_date": "20.02.2026",
        "total_images": len(IMAGES),
        "specs": IMAGE_SPECS,
        "images": []
    }
    
    for img in IMAGES:
        metadata["images"].append({
            "filename": img["filename"],
            "alt": img["alt"],
            "prompt_length": len(img["prompt"]),
            "status": "pending_generation"
        })
    
    with open(os.path.join(OUTPUT_DIR, "generation_metadata.json"), 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    
    print(f"📄 Metadata zapisana do generation_metadata.json")
    return metadata

def main():
    print("=" * 70)
    print("🎬 GENERATOR GRAFIK FLUX - dezynsekcja-poznan.pl")
    print("=" * 70)
    
    # Create output directory if doesn't exist
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    
    # Check dependencies
    check_dependencies()
    
    # Try different generation methods
    print("\n" + "=" * 70)
    print("METODA 1: Flux 1.0 API")
    print("=" * 70)
    if generate_with_flux_api(IMAGES[0]["prompt"], IMAGES[0]["filename"]):
        print("✅ API dostępny - kontynuuję generowanie...")
        for img in IMAGES[1:]:
            generate_with_flux_api(img["prompt"], img["filename"])
            time.sleep(1)
    else:
        print("\n" + "=" * 70)
        print("METODA 2: Lokalny Flux")
        print("=" * 70)
        if not generate_with_local_flux():
            print("\n" + "=" * 70)
            print("METODA 3: Tworzenie metadanych")
            print("=" * 70)
            metadata = create_placeholder()
            print(f"✅ Metadane stworzone dla {len(metadata['images'])} grafik")
            print("\n📋 INSTRUKCJE:")
            print("1. Zainstaluj Flux lokalnie: pip install diffusion-models-pytorch")
            print("2. Lub użyj API: https://api.bfl.ai")
            print(f"3. Prompty dostępne w: IMAGE_GENERATION_PROMPTS.md")
            print(f"4. Umieść grafiki w: {OUTPUT_DIR}")
    
    print("\n" + "=" * 70)
    print("✅ PROCES ZAKOŃCZONY")
    print("=" * 70)

if __name__ == "__main__":
    main()
