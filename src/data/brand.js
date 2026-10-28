const BRAND = Object.freeze({
  name: 'BerkahEmas', descriptor: 'Software Toko Emas', version: '1.0.0',
  baseUrl: 'https://berkahemas.web.id', platformUrl: 'https://app.berkahemas.web.id', whatsapp: '6287777809578',
});

function buildGraph(lang, faqItems = []) {
  const en = lang === 'en';
  const base = BRAND.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', '@id': `${base}/#software`,
        name: `${BRAND.name} — ${en ? 'Gold Store Software' : BRAND.descriptor}`,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Web browser',
        description: en ? 'Inventory, POS, buyback and reporting for gold stores.' : 'Inventori, POS kasir, buyback, dan laporan untuk toko emas.',
        url: en ? `${base}/en` : `${base}/`, image: `${base}/og-image.png`, publisher: { '@id': `${base}/#organization` } },
      { '@type': 'Organization', '@id': `${base}/#organization`, name: BRAND.name,
        url: `${base}/`, logo: `${base}/favicon.png`, sameAs: ['https://www.instagram.com/berkahemas.web.id'],
        contactPoint: { '@type': 'ContactPoint', telephone: '+6287777809578', contactType: 'Sales', availableLanguage: ['Indonesian', 'English'] } },
      { '@type': 'WebSite', '@id': `${base}/#website`, name: BRAND.name,
        url: `${base}/`, inLanguage: en ? 'en' : 'id', publisher: { '@id': `${base}/#organization` } },
      { '@type': 'FAQPage', '@id': `${base}/#faq`, mainEntity: faqItems.map(item => ({
        '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a },
      })) },
    ],
  };
}
module.exports = { BRAND, buildGraph };
