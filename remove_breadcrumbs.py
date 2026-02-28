import os
import re

ROOT_DIR = '/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl'

def run():
    count = 0
    # We want to match the breadcrumbs div and ideally its preceding indentation and trailing newline
    pattern = re.compile(r'[ \t]*<div class="breadcrumbs">.*?</div>[ \t]*\r?\n?', re.DOTALL | re.IGNORECASE)
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if '.git' in root or '.venv' in root: continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content, num_subs = pattern.subn('', content)
                
                if num_subs > 0:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Removed breadcrumbs from {filepath}")
                    count += 1
    
    print(f"Updated {count} files.")

if __name__ == '__main__':
    run()
