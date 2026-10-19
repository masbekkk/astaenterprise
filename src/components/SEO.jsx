import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import brand from '@/data/brand.js';
const { BRAND, buildGraph } = brand;

export default function SEO({ title, description, keywords, canonical, lang: pageLang, faqItems = [], robots = 'index, follow' }) {
  const { lang: appLang } = useApp();
  const lang = pageLang || appLang || 'id';
  const url = canonical || `${BRAND.baseUrl}${lang === 'en' ? '/en' : '/'}`;
  useEffect(() => {
    document.title = title || BRAND.name;
    const meta = (key, value, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = value || '';
    };
    const link = (rel, href, hreflang) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
      let el = document.head.querySelector(selector);
      if (!el) { el = document.createElement('link'); el.rel = rel; if (hreflang) el.hreflang = hreflang; document.head.appendChild(el); }
      el.href = href;
    };
    meta('title', title); meta('description', description); meta('keywords', keywords); meta('robots', robots);
    meta('author', BRAND.name); meta('publisher', BRAND.name);
    for (const prefix of ['og', 'twitter']) {
      const property = prefix === 'og';
      meta(`${prefix}:title`, title, property); meta(`${prefix}:description`, description, property);
      meta(`${prefix}:url`, url, property); meta(`${prefix}:image`, `${BRAND.baseUrl}/og-image.png`, property);
    }
    meta('og:site_name', BRAND.name, true); meta('og:type', 'website', true);
    meta('og:locale', lang === 'en' ? 'en_US' : 'id_ID', true);
    meta('og:locale:alternate', lang === 'en' ? 'id_ID' : 'en_US', true);
    meta('twitter:card', 'summary_large_image');
    link('canonical', url);
    link('alternate', `${BRAND.baseUrl}/`, 'id'); link('alternate', `${BRAND.baseUrl}/en`, 'en'); link('alternate', `${BRAND.baseUrl}/`, 'x-default');
    let graph = document.getElementById('structured-data-graph');
    if (!graph) { graph = document.createElement('script'); graph.id = 'structured-data-graph'; graph.type = 'application/ld+json'; document.head.appendChild(graph); }
    graph.textContent = JSON.stringify(buildGraph(lang, faqItems));
  }, [title, description, keywords, url, lang, faqItems, robots]);
  return null;
}
