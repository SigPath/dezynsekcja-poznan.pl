import os
import re
import posixpath

ROOT_ITEMS = [
    'assets', 'b2b', 'blog', 'cennik', 'deratyzacja-poznan', 
    'dezynfekcja-poznan', 'dezynsekcja-poznan', 'kontakt', 
    'opinie', 'ozonowanie-poznan', 'zwalczanie-zapachow-poznan', 
    'index.html', 'lead-magnet', 'cloudflare-worker'
]

def resolve_url(match, current_rel_dir):
    attr = match.group(1) # href or src
    url = match.group(2)
    
    # skip external links or anchors
    if url.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:')):
         return match.group(0)
    
    # skip already root-relative links
    if url.startswith('/'):
         return match.group(0)

    # skip empty
    if not url.strip():
        return match.group(0)

    # Check if it starts with a known root item
    first_part = url.split('/')[0]
    
    if first_part in ROOT_ITEMS:
        # It's meant to be root-relative but missing the slash
        resolved = '/' + url
        return f'{attr}="{resolved}"'
        
    # If it starts with '../' or similar, resolve it with normpath
    if current_rel_dir == '.':
        current_dir_abs = '/'
    else:
        current_dir_abs = '/' + current_rel_dir.replace('\\', '/') + '/'
    
    resolved = posixpath.normpath(posixpath.join(current_dir_abs, url))
    if not resolved.startswith('/'):
        resolved = '/' + resolved

    return f'{attr}="{resolved}"'

def fix_links(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        if '.venv' in root or '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                rel_dir = os.path.relpath(root, directory)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = re.sub(
                    r'(href|src)="([^"]+)"',
                    lambda m: resolve_url(m, rel_dir),
                    content
                )
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")
                    count += 1
    print(f"Total files fixed: {count}")

if __name__ == '__main__':
    fix_links('/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl')
