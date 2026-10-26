const assert = require('node:assert/strict');
const { processTemplate } = require('./prerender');
const { BRAND, buildGraph } = require('../src/data/brand.js');
const content = require('../src/data/brand-content.json');
for (const lang of ['id', 'en']) {
  const stale = '<html lang="id"><head><title>Old</title><meta name="description" content="old"><link rel="canonical" href="old"><script type="application/ld+json">{"aggregateRating":{}}</script></head><body></body></html>';
  const html = processTemplate(stale, lang);
  const graph = JSON.parse(html.match(/<script id="structured-data-graph"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(graph, buildGraph(lang, content[lang].faq.items));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, 1);
  assert.match(html, new RegExp(`<html lang="${lang}">`));
  assert.ok(html.includes(content[lang].meta.title));
  assert.ok(html.includes(`${BRAND.baseUrl}${lang === 'en' ? '/en' : '/'}`));
  assert.ok(!/aggregateRating|ratingCount|priceValidUntil|ISO|256-bit|200\+|1.second|#1\b/i.test(html));
  assert.ok(html.includes('content="#102D50"'));
  assert.equal(processTemplate(html, lang), html);
}
console.log('PASS: bilingual metadata, schema parity, canonical uniqueness, unsupported-claim removal.');
