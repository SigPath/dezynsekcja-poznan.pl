import os
import xml.etree.ElementTree as ET
from datetime import datetime

ROOT_DIR = '/Users/marcin/Desktop/Skrypty/Visual Studio Code/dezynsekcja-poznan.pl'
BASE_URL = 'https://dezynsekcja-poznan.pl'

def run():
    urlset = ET.Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if '.git' in root or '.venv' in root: continue
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, ROOT_DIR)
                
                # Convert path to URL format
                url_path = rel_path.replace('\\', '/')
                
                # Strip index.html from directory index pages for cleaner URLs,
                # except for the main root index.html which becomes just '/'
                if url_path == 'index.html':
                    url_str = BASE_URL + '/'
                    priority = '1.0'
                else:
                    if url_path.endswith('/index.html'):
                        url_str = BASE_URL + '/' + url_path[:-11]
                    else:
                        url_str = BASE_URL + '/' + url_path
                        
                    # Calculate priority based on depth roughly
                    depth = url_str.count('/') - 3 # Subtracting the // in https://
                    if depth == 1:
                        priority = '0.9'
                    elif depth == 2:
                        priority = '0.8'
                    else:
                        priority = '0.7'
                
                url = ET.SubElement(urlset, 'url')
                loc = ET.SubElement(url, 'loc')
                loc.text = url_str
                
                pri = ET.SubElement(url, 'priority')
                pri.text = priority
                
                freq = ET.SubElement(url, 'changefreq')
                freq.text = 'weekly'
                
    # Write to file
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ", level=0)
    tree.write(os.path.join(ROOT_DIR, 'sitemap.xml'), encoding='utf-8', xml_declaration=True)
    print("Sitemap generated successfully.")

if __name__ == '__main__':
    run()
