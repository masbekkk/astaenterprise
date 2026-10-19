import React from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import brand from '@/data/brand.js';
const { BRAND } = brand;

export default function Footer() {
  const { t, lang } = useApp();
  return <footer data-testid="site-footer" className="border-t border-[#DFE5DD] bg-[#F0F4EF] text-[#526259]">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
      <div><Logo /><p className="mt-5 max-w-sm text-sm leading-relaxed">{t.footer.brandDesc}</p></div>
      <div><h2 className="mb-4 font-bold text-[#182923]">{t.footer.modulesTitle}</h2><ul className="space-y-3 text-sm">{t.features.items.map(item => <li key={item.id}><a href="#features" className="hover:text-[#075E46]">{item.badge}</a></li>)}</ul></div>
      <div className="space-y-3 text-sm"><h2 className="font-bold text-[#182923]">{lang === 'en' ? 'Request a product demo' : 'Minta demo produk'}</h2>
        <a className="block hover:text-[#075E46]" href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(t.whatsapp.prefill)}`} target="_blank" rel="noopener noreferrer">{t.footer.whatsapp}</a>
        <a className="block hover:text-[#075E46]" href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
        <a className="block hover:text-[#075E46]" href={t.footer.instagramUrl} target="_blank" rel="noopener noreferrer">{t.footer.instagram}</a>
      </div>
    </div>
    <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-[#DFE5DD] px-6 py-6 text-xs md:px-10"><p>© {new Date().getFullYear()} {t.footer.copyright}</p><a href="#faq">{t.footer.helpFaq}</a></div>
  </footer>;
}
