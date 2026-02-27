const fs = require('fs');
const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

// replace href="/something" with href="something"
content = content.replace(/href="\/(?!\/)/g, 'href="');
// replace src="/something" with src="something"
content = content.replace(/src="\/(?!\/)/g, 'src="');

fs.writeFileSync(file, content);
console.log("Paths fixed");
