import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const links = [['features', t.nav.features], ['store-access', t.nav.storeAccess], ['how-it-works', t.nav.howItWorks], ['gallery', t.nav.gallery], ['pricing', t.nav.pricing], ['faq', t.nav.faq]];
  return <header data-testid="site-navbar" className="sticky top-0 z-50 border-b border-[#DFE5DD] bg-[#F8F6EF]/95 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
      <Logo />
      <nav className="hidden items-center gap-5 xl:flex" aria-label={lang === 'en' ? 'Main navigation' : 'Navigasi utama'}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`} className="text-sm font-semibold text-[#526259] hover:text-[#075E46]">{label}</a>)}
      </nav>
      <div className="hidden items-center gap-4 md:flex"><LanguageSwitcher /><a href="#demo" className="rounded-full bg-[#075E46] px-5 py-3 text-sm font-bold text-white hover:bg-[#064B39]">{t.nav.requestDemo}</a></div>
      <button type="button" className="rounded-lg p-2 text-[#075E46] xl:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={lang === 'en' ? 'Toggle menu' : 'Buka menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="space-y-4 border-t border-[#DFE5DD] px-6 py-5 xl:hidden">
      {links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-[#182923]">{label}</a>)}
      <div className="flex flex-wrap items-center gap-4"><LanguageSwitcher /><a href="#demo" onClick={() => setOpen(false)} className="rounded-full bg-[#075E46] px-5 py-3 text-sm font-bold text-white">{t.nav.requestDemo}</a></div>
    </nav>}
  </header>;
}
