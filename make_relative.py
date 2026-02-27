import os
import re

ROOT_DIR = '/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl'
ROOT_ITEMS = ['assets', 'b2b', 'blog', 'cennik', 'deratyzacja-poznan', 'dezynfekcja-poznan', 'dezynsekcja-poznan', 'index.html', 'kontakt', 'lead-magnet', 'opinie', 'ozonowanie-poznan', 'zwalczanie-zapachow-poznan']

def get_depth_prefix(filepath):
    rel_path = os.path.relpath(filepath, ROOT_DIR)
    depth = rel_path.count(os.sep)
    if depth == 0:
        return './'
    return '../' * depth

def is_internal_link(url):
    if not url: return False
    if url.startswith('http://') or url.startswith('https://') or url.startswith('mailto:') or url.startswith('tel:') or url.startswith('data:'):
        return False
    if url.startswith('#'):
        return False
    return True

def fix_link(match, filepath, prefix):
    attr = match.group(1) # href or src
    quote = match.group(2) # " or '
    url = match.group(3)
    
    if not is_internal_link(url):
        return match.group(0)
    
    # Normalize to an absolute-like path from root
    # 1. If it already starts with '/', it's absolute from root
    if url.startswith('/'):
        normalized = url[1:]
    # 2. If it starts with '../', we trace it back
    elif url.startswith('../'):
        # For our subpages, we know their depth. We can figure out where it points to.
        # But actually, doing os.path.normpath relative to the file's dir is easiest:
        file_dir = os.path.dirname(filepath)
        abs_target = os.path.normpath(os.path.join(file_dir, url))
        try:
            # Get path relative to ROOT_DIR
            normalized = os.path.relpath(abs_target, ROOT_DIR)
        except ValueError:
            normalized = url # fallback
    else:
        # 3. It's a relative path like "dezynsekcja-poznan/index.html"
        # Wait, if it's "dezynsekcja-poznan/index.html" inside "dezynsekcja-poznan/index.html", 
        # it was likely a WRONG link that meant to point to the root "dezynsekcja-poznan/index.html".
        # We can check if the first part is in ROOT_ITEMS.
        first_part = url.split('/')[0]
        if first_part in ROOT_ITEMS:
            # It was definitely meant to be root-relative
            normalized = url
        else:
            # It's an image like "image.png" or "pluskwy-srodmiescie/index.html". 
            # We resolve it relative to the current file's directory.
            file_dir = os.path.dirname(filepath)
            abs_target = os.path.normpath(os.path.join(file_dir, url))
            normalized = os.path.relpath(abs_target, ROOT_DIR)
            
    # Now that we have the path relative to the root (e.g. 'dezynsekcja-poznan/index.html'),
    # we prepend the correct depth prefix.
    final_url = prefix + normalized
    
    # Fix Windows paths to use forward slashes
    final_url = final_url.replace('\\', '/')
    
    return f'{attr}={quote}{final_url}{quote}'

def run():
    count = 0
    link_pattern = re.compile(r'(href|src)=([\'"])(.*?)\2')
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if '.git' in root or '.venv' in root: continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                prefix = get_depth_prefix(filepath)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                new_content = link_pattern.sub(lambda m: fix_link(m, filepath, prefix), content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filepath}")
                    count += 1
    
    print(f"Updated links in {count} HTML files.")

if __name__ == '__main__':
    run()
