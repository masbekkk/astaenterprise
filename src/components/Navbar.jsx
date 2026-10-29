import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/context/AppContext';
import { getTrialUrl } from '@/services/conversionLinks';

export default function Navbar() {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onEscape = event => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);
  const links = [['features', t.nav.features], ['store-access', t.nav.storeAccess], ['how-it-works', t.nav.howItWorks], ['gallery', t.nav.gallery], ['pricing', t.nav.pricing], ['faq', t.nav.faq]];
  return <header data-testid="site-navbar" className="font-sans sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
      <Logo />
      <nav className="hidden items-center gap-5 xl:flex" aria-label={lang === 'en' ? 'Main navigation' : 'Navigasi utama'}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`} className="text-sm font-semibold text-muted-foreground hover:text-primary">{label}</a>)}
      </nav>
      <div className="hidden items-center gap-4 md:flex"><LanguageSwitcher /><a href={getTrialUrl(lang)} className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-brand-700">{t.nav.requestDemo}</a></div>
      <button ref={toggleRef} type="button" className="rounded-lg p-2 text-primary xl:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (lang === 'en' ? 'Close menu' : 'Tutup menu') : (lang === 'en' ? 'Open menu' : 'Buka menu')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="space-y-4 border-t border-border px-6 py-5 xl:hidden">
      {links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-2 text-sm font-semibold text-foreground">{label}</a>)}
      <div className="flex flex-wrap items-center gap-4 md:hidden"><LanguageSwitcher /><a href={getTrialUrl(lang)} onClick={() => setOpen(false)} className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white">{t.nav.requestDemo}</a></div>
    </nav>}
  </header>;
}
