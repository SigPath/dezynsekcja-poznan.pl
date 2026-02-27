const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

const headerRegex = /<header class="glass-header">[\s\S]*?<\/header>/;
const footerRegex = /<footer class="modern-footer border-top">[\s\S]*?<\/footer>/;
const mobileDockRegex = /<!-- MOBILE COMPACT CTA DOCK -->[\s\S]*?<div class="mobile-cta-dock glass-dock d-none-desktop">[\s\S]*?<\/div>/;

const newHeaderMatch = indexHtmlContent.match(headerRegex);
const newFooterMatch = indexHtmlContent.match(footerRegex);
const newMobileDockMatch = indexHtmlContent.match(mobileDockRegex);

if (!newHeaderMatch || !newFooterMatch || !newMobileDockMatch) {
    console.error("Nie udało się pobrać nowych komponentów z index.html!");
    process.exit(1);
}

const newHeaderTemplate = newHeaderMatch[0];
const newFooterTemplate = newFooterMatch[0];
const newMobileDockTemplate = newMobileDockMatch[0];

const oldHeaderRegex = /<header[\s\S]*?<\/header>/;
const oldFooterRegex = /<footer[\s\S]*?<\/footer>/;

const blobs = `
  <!-- Background Blobs for depth (Apple-like) -->
  <div class="blob-bg blob-1"></div>
  <div class="blob-bg blob-2"></div>
`;

const hubLinks = [
    '/dezynsekcja-poznan', '/ozonowanie-poznan', '/cennik', '/opinie', '/kontakt', '/blog',
    '/dezynsekcja-poznan/zwalczanie-pluskiew-poznan',
    '/dezynsekcja-poznan/zwalczanie-karaluchow-poznan',
    '/dezynsekcja-poznan/mrowki-poznan',
    '/dezynsekcja-poznan/osy-szerszenie-poznan',
    '/deratyzacja-poznan',
    '/dezynfekcja-poznan',
    '/zwalczanie-zapachow-poznan',
    '/b2b/restauracje', '/b2b/magazyny-hurtownie', '/b2b/wspolnoty-mieszkaniowe', '/b2b/hotele', '/b2b/biura'
];

function processHtmlFile(filePath) {
    if (filePath === indexHtmlPath) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    content = content.replace(oldHeaderRegex, () => newHeaderTemplate);
    content = content.replace(oldFooterRegex, () => newFooterTemplate);

    if (content.includes('<body>')) {
        content = content.replace('<body>', '<body class="theme-dark">');
    }

    if (content.includes('<body class="theme-dark">') && !content.includes('blob-bg')) {
        content = content.replace('<body class="theme-dark">', '<body class="theme-dark">\n' + blobs);
    }

    if (!content.includes('mobile-cta-dock')) {
        content = content.replace('</body>', '\n  ' + newMobileDockTemplate + '\n</body>');
    }

    const relativePathFromRoot = path.relative(rootDir, filePath);
    const depth = relativePathFromRoot.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';

    if (depth > 0) {
        // Sztywne logo home: 
        content = content.replace(/href="index\.html"/g, `href="${prefix}index.html"`);

        // Reszta nawigacji:
        hubLinks.forEach(link => {
            const regexStr = `href="${link}"(?!\\/)`;
            const regex = new RegExp(regexStr, 'g');
            const cleanLink = link.substring(1);

            content = content.replace(regex, `href="${prefix}${cleanLink}"`);
        });
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Zmodernizowano: ${relativePathFromRoot}`);
    }
}

function walkDir(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && name.endsWith('.html')) {
            callback(filePath);
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.git' && name !== 'assets') {
            walkDir(filePath, callback);
        }
    });
}

console.log("Rozpoczynam morderczo-masową modernizację podstron...");
walkDir(rootDir, processHtmlFile);
console.log("Gotowe!");
