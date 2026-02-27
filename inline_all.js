const fs = require('fs');
const path = require('path');

const cssFile = 'assets/css/style.css';
const jsFile = 'assets/js/main.js';
const css = fs.readFileSync(cssFile, 'utf8');
const js = fs.readFileSync(jsFile, 'utf8');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'assets') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      const cssRegex = /<link[^>]*href="[^"]*style\.css"[^>]*>/;
      if (cssRegex.test(html)) {
        html = html.replace(cssRegex, '<style>\n' + css + '\n</style>');
        changed = true;
      }
      
      const jsRegex = /<script[^>]*src="[^"]*main\.js"[^>]*><\/script>/;
      if (jsRegex.test(html)) {
        html = html.replace(jsRegex, '<script>\n' + js + '\n</script>');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, html);
        console.log('Inlined in:', fullPath);
      }
    }
  }
}

processDir('.');
console.log('Done inlining all HTML files');
