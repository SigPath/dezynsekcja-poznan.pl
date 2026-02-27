const fs = require('fs');

const htmlFile = 'index.html';
const cssFile = 'assets/css/style.css';
const jsFile = 'assets/js/main.js';

let html = fs.readFileSync(htmlFile, 'utf8');
const css = fs.readFileSync(cssFile, 'utf8');
const js = fs.readFileSync(jsFile, 'utf8');

// Replace CSS link with inline <style>
html = html.replace(
  /<link[^>]*href="[^"]*style\.css"[^>]*>/,
  '<style>\n' + css + '\n</style>'
);

// Replace JS script with inline <script>
html = html.replace(
  /<script[^>]*src="[^"]*main\.js"[^>]*><\/script>/,
  '<script>\n' + js + '\n</script>'
);

fs.writeFileSync(htmlFile, html);
console.log('Successfully inlined CSS and JS into index.html');
