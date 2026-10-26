import React, { useState, useEffect, useMemo } from "react";
import GoldHero from "@/components/GoldHero";
import GoldPriceReference from "@/components/GoldPriceReference";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Boxes,
  Repeat2,
  FileBarChart,
  Building2,
  Database,
  Globe,
  Coins,
  ScanBarcode,
  Lock,
  ChevronDown,
  MessageCircle,
  Check,
  Scale,
  TrendingDown,
  FileWarning,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BrowserMockup from "@/components/BrowserMockup";
import SEO from "@/components/SEO";
import { useApp } from "@/context/AppContext";
import { getSubscriptionPlans, getInitialCachedPlans } from "@/services/planService";

export default function Home() {
  const { t, lang } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [apiPlans, setApiPlans] = useState(() => getInitialCachedPlans());

  // Fetch / revalidate subscription plans using Frontend SWR Caching
  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      const result = await getSubscriptionPlans();
      if (isMounted && result.data) {
        setApiPlans(result.data);
      }
    };

    loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute live pricing tiers with language & fallback support
  const pricingTiers = useMemo(() => {
    if (!apiPlans || apiPlans.length === 0) {
      return t.pricing?.tiers || [];
    }

    const fallbackTiers = t.pricing?.tiers || [];
    const isIndonesian = lang === "id";

    return apiPlans.map((plan, idx) => {
      const planKey = (plan.plan || plan.name || "").toLowerCase();
      const localTier =
        fallbackTiers.find(
          (lt) =>
            lt.name.toLowerCase() === planKey ||
            lt.name.toLowerCase() === (plan.display_name || "").toLowerCase()
        ) || fallbackTiers[idx];

      const priceMonthly = Number(plan.price_monthly) || 0;
      let formattedPrice = "";
      if (priceMonthly > 0) {
        formattedPrice = isIndonesian
          ? `Rp ${priceMonthly.toLocaleString("id-ID")}`
          : `Rp ${priceMonthly.toLocaleString("en-US")}`;
      } else {
        formattedPrice = isIndonesian ? "Kustom" : "Custom";
      }

      const period =
        priceMonthly > 0
          ? t.pricing?.periodMonth || (isIndonesian ? "/ bulan" : "/ month")
          : "";

      const isFeatured = Boolean(plan.featured || plan.is_popular || localTier?.featured);
      const badge = isFeatured
        ? localTier?.badge || t.pricing?.popularBadge || (isIndonesian ? "Paling Populer" : "Most Popular")
        : null;

      // Use localized features if available, otherwise API features
      const features =
        isIndonesian && localTier?.features?.length > 0
          ? localTier.features
          : plan.features || localTier?.features || [];

      return {
        name: isIndonesian && localTier?.name ? localTier.name : plan.display_name || plan.name,
        tagline: isIndonesian && localTier?.tagline ? localTier.tagline : plan.tagline || plan.description,
        price: formattedPrice,
        period,
        featured: isFeatured,
        badge,
        features,
        ctaText: localTier?.ctaText || (isIndonesian ? "Pilih Paket" : "Choose Plan"),
      };
    });
  }, [apiPlans, t.pricing, lang]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const painPointIcons = [Scale, TrendingDown, FileWarning, ShieldAlert];
  const galleryIcons = [TrendingUp, Boxes, ScanBarcode, Coins, Repeat2, FileBarChart, Building2, Lock];

  const galleryModules = (t.gallery?.modules || []).map((m, idx) => ({
    ...m,
    icon: galleryIcons[idx % galleryIcons.length],
  }));

  const canonicalUrl = lang === "en" ? "https://berkahemas.web.id/en" : "https://berkahemas.web.id/";

  return (
    <div className="bg-background text-zinc-900 min-h-screen selection:bg-brand-500/20 selection:text-brand-900 relative overflow-hidden">
      <SEO
        title={t.meta?.title}
        description={t.meta?.description}
        canonical={canonicalUrl}
        keywords={t.meta?.keywords}
        lang={lang}
        faqItems={t.faq?.items}
        plans={pricingTiers}
      />

      <GoldHero />
      <GoldPriceReference />

      {/* 2. PAIN POINTS SECTION */}
      {t.painPoints && (
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="eyebrow">
                {t.painPoints.solutionTag}
              </span>
              <h2 className="text-3xl sm:text-4xl text-zinc-950 font-editorial">
                {t.painPoints.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.painPoints.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.painPoints.items || []).map((item, idx) => {
                const IconComp = painPointIcons[idx % painPointIcons.length];
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-brand-200/70 bg-surface p-7 shadow-sm shadow-brand-950/[0.03] hover:shadow-sm hover:border-brand-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-700 shadow-sm">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. DEEP DIVE FEATURES SECTION */}
      {t.features && (
        <section id="features" className="py-20 md:py-28 bg-background border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-28">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="eyebrow">
                {t.nav?.features || "Fitur Unggulan"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-950 font-editorial">
                {t.features.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.features.subtitle}
              </p>
            </div>

            {(t.features.items || []).map((feat, idx) => {
              const isReversed = idx % 2 !== 0;
              return (
                <div
                  key={feat.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Column */}
                  <div className={`lg:col-span-5 space-y-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
                      {feat.badge}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-950 leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-zinc-600 text-base leading-relaxed">
                      {feat.desc}
                    </p>
                    <ul className="space-y-3 pt-2">
                      {(feat.highlights || []).map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-zinc-700 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Column */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="rounded-xl p-2 bg-background shadow-sm shadow-brand-950/10">
                      <BrowserMockup
                        src={feat.image}
                        alt={feat.title}
                        url={feat.url}
                        badge={feat.imageBadge}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {t.storeAccess && (
        <section id="store-access" aria-labelledby="store-access-title" className="scroll-mt-24 border-b border-brand-200 bg-brand-50/50 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-10 max-w-2xl space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-700">{t.storeAccess.eyebrow}</p>
              <h2 id="store-access-title" className="text-3xl   text-zinc-950 sm:text-4xl font-editorial">{t.storeAccess.title}</h2>
              <p className="text-base leading-relaxed text-zinc-600">{t.storeAccess.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {t.storeAccess.items.map((item) => {
                const AccessIcon = { database: Database, subdomain: Globe, domain: Building2 }[item.id];
                return (
                  <article key={item.id} className="flex min-w-0 flex-col rounded-xl border border-brand-200 bg-surface p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><AccessIcon className="h-6 w-6" aria-hidden="true" /></div>
                    <h3 className="text-lg font-bold text-zinc-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                    {item.example && <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-3"><p className="mb-1 text-xs text-zinc-600">{t.storeAccess.exampleLabel}</p><code className="break-all text-sm font-semibold text-brand-800">{item.example}</code></div>}
                    {item.note && <p className="mt-5 text-xs font-semibold text-brand-700">{item.note}</p>}
                  </article>
                );
              })}
            </div>
            <a href="#demo" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-800">{t.storeAccess.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE MODULE GALLERY */}
      {galleryModules.length > 0 && (
        <section id="gallery" className="py-20 md:py-28 bg-background border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="eyebrow">
                {t.nav?.gallery || "Galeri Modul"}
              </span>
              <h2 className="text-3xl sm:text-4xl text-zinc-950 font-editorial">
                {t.gallery.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.gallery.subtitle}
              </p>
            </div>

            {/* Module Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
              {galleryModules.map((mod, idx) => {
                const IconComp = mod.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-surface text-zinc-700 border border-zinc-200/90 hover:border-brand-300 hover:text-zinc-950"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                    <span>{mod.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Showcase Card */}
            {galleryModules[activeTab] && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-xl border border-brand-200/90 bg-surface p-6 sm:p-10 shadow-sm shadow-brand-950/[0.04]">
                <div className="lg:col-span-5 space-y-5">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
                    {galleryModules[activeTab].badge}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-950">
                    {galleryModules[activeTab].title}
                  </h3>
                  <p className="text-zinc-600 text-base leading-relaxed">
                    {galleryModules[activeTab].desc}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {(galleryModules[activeTab].highlights || []).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3">
                    <Button className="rounded-lg bg-primary hover:bg-brand-700 text-white font-bold text-sm px-6 shadow-md shadow-brand-600/20" asChild>
                      <a href="#demo">
                        {t.nav.requestDemo}
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl p-2 bg-background shadow-sm">
                    <BrowserMockup
                      src={galleryModules[activeTab].image}
                      alt={galleryModules[activeTab].title}
                      url={galleryModules[activeTab].url}
                      badge={t.gallery.liveBadge || "Data demo"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. HOW IT WORKS SECTION */}
      {t.howItWorks && (
        <section id="how-it-works" className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="eyebrow">
                {t.nav?.howItWorks || "Cara Kerja"}
              </span>
              <h2 className="text-3xl sm:text-4xl text-zinc-950 font-editorial">
                {t.howItWorks.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.howItWorks.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.howItWorks.steps || []).map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl border border-brand-200/70 bg-surface p-7 shadow-sm shadow-brand-950/[0.03] hover:shadow-sm hover:border-brand-400 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-brand-700 font-mono">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. PRICING SECTION (Live API + i18n Fallback) */}
      {t.pricing && (
        <section id="pricing" className="py-20 md:py-28 bg-background border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="eyebrow">
                {t.nav?.pricing || "Harga"}
              </span>
              <h2 className="text-3xl sm:text-4xl text-zinc-950 font-editorial">
                {t.pricing.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.pricing.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    tier.featured
                      ? "bg-surface border-2 border-brand-500 shadow-sm shadow-brand-900/10 z-10"
                      : "bg-surface/80 border border-brand-200/80 shadow-sm shadow-brand-950/[0.03] hover:border-brand-400"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-lg bg-primary text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">{tier.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1.5 min-h-[36px]">{tier.tagline}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-bold text-zinc-950">{tier.price}</span>
                      {tier.period && <span className="text-xs text-zinc-500 font-medium">{tier.period}</span>}
                    </div>

                    <ul className="space-y-3 pt-4 border-t border-zinc-100">
                      {(tier.features || []).map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                          <Check className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Button
                        className={`w-full h-11 rounded-lg font-bold text-sm transition-all ${
                          tier.featured
                            ? "bg-primary hover:bg-brand-700 text-white shadow-md shadow-brand-600/25"
                            : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200"
                        }`}
                       asChild>
                      <a href="#demo">
                        {tier.ctaText}
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation Banner */}
            {t.pricing.banner && (
              <div className="mt-16 rounded-xl border border-brand-300/80 bg-background p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm shadow-brand-900/5 space-y-6">
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-200/80 text-brand-900">
                  {t.pricing.banner.badge}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-950">
                  {t.pricing.banner.title}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
                  {t.pricing.banner.desc}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button className="h-12 px-8 rounded-lg bg-primary hover:bg-brand-700 text-white font-bold text-sm shadow-sm shadow-brand-600/25" asChild>
                      <a
                    href="https://wa.me/6285183003076?text=Halo%20BerkahEmas%2C%20saya%20tertarik%20konsultasi%20software%20toko%20emas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t.pricing.banner.cta}
                    </a>
                    </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  {t.pricing.banner.sub}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. FAQ SECTION */}
      {t.faq && (
        <section id="faq" className="py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-12">
            <div className="text-center space-y-3">
              <span className="eyebrow">
                {t.nav?.faq || "FAQ"}
              </span>
              <h2 className="text-3xl sm:text-4xl text-zinc-950 font-editorial">
                {t.faq.title}
              </h2>
              <p className="text-zinc-600 text-base leading-relaxed">
                {t.faq.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {(t.faq.items || []).map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="rounded-xl border border-brand-200/80 bg-surface overflow-hidden shadow-sm hover:border-brand-400 transition-colors"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 text-base sm:text-lg hover:text-brand-700 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-brand-600 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div id={`faq-answer-${idx}`} className="px-6 pb-6 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-brand-100 pt-4 bg-brand-50/30 animate-fade-up">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 9. DEMO REQUEST CTA SECTION */}
      <section id="demo" className="demo-invitation py-20 md:py-28 bg-background border-t border-brand-900/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-700 text-white shadow-sm">
            {t.hero?.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-950 font-editorial">
            {t.hero?.titleStart}
            <span className="text-gold">
              {t.hero?.titleHighlight}
            </span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto">
            {t.hero?.subheadline}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button className="h-12 px-8 rounded-lg bg-primary hover:bg-brand-700 text-white font-bold text-base shadow-sm" asChild>
                      <a
              href="https://wa.me/6285183003076?text=Halo%20BerkahEmas%2C%20saya%20tertarik%20konsultasi%20software%20toko%20emas"
              target="_blank"
              rel="noopener noreferrer"
            >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.hero?.ctaPrimary}
              </a>
                    </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
