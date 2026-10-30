import fs from 'node:fs';
import path from 'node:path';

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Move <noscript> GTM immediately after opening <body...> tag, before <div hidden="">
  const bodyRegex = /(<body[^>]*>)(<div hidden=\"\"><!--\$--><!--\/\$-->\s*<\/div>)(<noscript><iframe src=\"https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TFZM4BLW\"[^>]*><\/iframe><\/noscript>)/;
  if (bodyRegex.test(content)) {
    content = content.replace(bodyRegex, '$1$3$2');
    changed = true;
  }

  // 2. Move GTM <script> right after opening <head> tag
  const gtmScriptRegex = /<script>\(function\(w,d,s,l,i\)\{w\[l\]=w\[l\]\|\|\[\];w\[l\]\.push\(\{'gtm\.start'[\s\S]*?GTM-TFZM4BLW'\);<\/script>/;
  const scriptMatch = content.match(gtmScriptRegex);
  if (scriptMatch) {
    const fullScript = scriptMatch[0];
    content = content.replace(fullScript, '');
    content = content.replace('<head>', `<head>${fullScript}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Optimized GTM placement in: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  }
}

console.log('Running post-build GTM placement optimization...');
walkDir(path.join(process.cwd(), '.next/server/app'));
console.log('Post-build GTM placement optimization complete.');
