const fs = require('node:fs');
const path = require('node:path');
const { BRAND, buildGraph } = require('../src/data/brand.js');
const content = require('../src/data/brand-content.json');
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function processTemplate(template, lang) {
  const { meta, faq } = content[lang];
  const url = `${BRAND.baseUrl}${lang === 'en' ? '/en' : '/'}`;
  const graph = JSON.stringify(buildGraph(lang, faq.items)).replaceAll('<', '\u003c');
  const metadata = [
    ['name', 'title', meta.title], ['name', 'description', meta.description], ['name', 'keywords', meta.keywords],
    ['name', 'author', BRAND.name], ['name', 'publisher', BRAND.name], ['name', 'theme-color', '#075E46'],
    ['property', 'og:title', meta.title], ['property', 'og:description', meta.description], ['property', 'og:url', url],
    ['property', 'og:site_name', BRAND.name], ['property', 'og:type', 'website'],
    ['property', 'og:image', `${BRAND.baseUrl}/og-image.png`], ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:locale', lang === 'en' ? 'en_US' : 'id_ID'], ['property', 'og:locale:alternate', lang === 'en' ? 'id_ID' : 'en_US'],
    ['name', 'twitter:title', meta.title], ['name', 'twitter:description', meta.description], ['name', 'twitter:url', url],
    ['name', 'twitter:image', `${BRAND.baseUrl}/og-image.png`], ['name', 'twitter:card', 'summary_large_image'],
  ];
  let html = template.replace(/<html[^>]*>/i, `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<link\s+[^>]*rel="(?:canonical|alternate)"[^>]*>\s*/gi, '');
  for (const [attr, key, value] of metadata) {
    const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
    const pattern = new RegExp(`<meta\\s+[^>]*${attr}="${key}"[^>]*>`, 'i');
    html = pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}\n</head>`);
  }
  const links = `<link rel="canonical" href="${url}" />\n<link rel="alternate" hreflang="id" href="${BRAND.baseUrl}/" />\n<link rel="alternate" hreflang="en" href="${BRAND.baseUrl}/en" />\n<link rel="alternate" hreflang="x-default" href="${BRAND.baseUrl}/" />`;
  return html.replace('</head>', `${links}\n<script id="structured-data-graph" type="application/ld+json">${graph}</script>\n</head>`);
}
if (require.main === module) {
  const buildDir = path.resolve(__dirname, '../build');
  const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
  fs.writeFileSync(path.join(buildDir, 'index.html'), processTemplate(template, 'id'));
  fs.mkdirSync(path.join(buildDir, 'en'), { recursive: true });
  fs.writeFileSync(path.join(buildDir, 'en/index.html'), processTemplate(template, 'en'));
  console.log('BerkahEmas metadata and structured data generated for / and /en.');
}
module.exports = { processTemplate };
