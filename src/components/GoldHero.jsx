import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import BrowserMockup from '@/components/BrowserMockup';
import { useApp } from '@/context/AppContext';
import { getTrialUrl } from '@/services/conversionLinks';

export default function GoldHero() {
  const { t, lang } = useApp();
  const light = useRef(null);
  const pointerMove = event => {
    if (event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Transform a decorative element directly; pointer movement never re-renders the page.
    light.current.style.transform = `translate(${event.clientX - rect.left - 240}px, ${event.clientY - rect.top - 240}px)`;
    light.current.style.opacity = '1';
  };
  return <section className="gold-hero" onPointerMove={pointerMove} onPointerLeave={() => { if (light.current) light.current.style.opacity = '0'; }}>
    <div ref={light} className="hero-pointer-light" aria-hidden="true" />
    <div className="hero-layout mx-auto max-w-7xl px-6 md:px-10">
      <div className="relative z-10 min-w-0">
        <p className="eyebrow hero-eyebrow"><span aria-hidden="true" />{t.hero.badge}</p>
        <h1 className="hero-title">{t.hero.editorialStart}<em>{t.hero.editorialHighlight}</em></h1>
        <p className="hero-description">{t.hero.subheadline}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href={getTrialUrl(lang)} data-testid="hero-primary-cta" className="hero-primary">{t.hero.ctaPrimary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <a href="#features" className="hero-secondary">{t.hero.ctaSecondary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <a href="#pricing" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-ivory underline decoration-gold underline-offset-4 hover:text-gold">{t.hero.ctaPlans}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
        <p className="mt-4 text-xs text-ivory/75">{t.trial.note}</p>
        <ul className="hero-highlights">{t.hero.highlights.map(label => <li key={label}><Check className="h-3.5 w-3.5" aria-hidden="true" />{label}</li>)}</ul>
      </div>
      <figure className="hero-product relative z-10 min-w-0">
        <div className="mb-5 flex items-center justify-between gap-4 text-xs text-ivory/75"><span className="uppercase tracking-[0.16em]">BerkahEmas / ERP & POS</span><span>{lang === 'en' ? 'Product overview' : 'Sekilas produk'}</span></div>
        <BrowserMockup src="/assets/screenshots/dashboard.webp" alt={lang === 'en' ? 'BerkahEmas gold-store dashboard with demo data' : 'Dashboard toko emas BerkahEmas dengan data demo'} badge={lang === 'en' ? 'Demo data' : 'Data demo'} priority glow={false} />
        <figcaption className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-ivory/75"><span className="mt-2 h-px w-8 shrink-0 bg-gold" />{t.hero.productCaption}</figcaption>
      </figure>
    </div>
    <div className="hero-bottom-rule" aria-hidden="true" />
  </section>;
}
