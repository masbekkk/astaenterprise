import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Boxes,
  Repeat2,
  FileBarChart,
  Users,
  Building2,
  Coins,
  ScanBarcode,
  Lock,
  ChevronDown,
  MessageCircle,
  Check,
  Star,
  Scale,
  TrendingDown,
  FileWarning,
  ShieldAlert,
  Zap
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

  const canonicalUrl = lang === "en" ? "https://astaenterprise.id/en" : "https://astaenterprise.id/";

  return (
    <div className="bg-[#F8F6EF] text-zinc-900 min-h-screen selection:bg-brand-500/20 selection:text-brand-900 relative overflow-hidden">
      <SEO
        title={t.meta?.title}
        description={t.meta?.description}
        canonical={canonicalUrl}
        keywords={t.meta?.keywords}
        lang={lang}
        faqItems={t.faq?.items}
        plans={pricingTiers}
      />

      {/* Ambient Gradient Blobs (Kolabo style) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-3xl" />
        <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-brand-100/50 via-brand-200/20 to-transparent blur-3xl" />
        <div className="absolute top-[70%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-brand-100/40 via-brand-50/30 to-transparent blur-3xl" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden border-b border-brand-900/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Eyebrow */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-300/80 bg-brand-50/80 shadow-sm text-xs font-semibold text-brand-900"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-600 animate-pulse" />
              <span>{t.hero?.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]"
            >
              {t.hero?.titleStart}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600">
                {t.hero?.titleHighlight}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-3xl mx-auto"
            >
              {t.hero?.subheadline}
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center gap-4"
            >
              <a href="#demo">
                <Button
                  data-testid="hero-primary-cta"
                  className="h-13 px-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-base shadow-[0_8px_25px_rgba(7,94,70,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.hero?.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="#features"
              >
                <Button
                  variant="ghost"
                  className="h-13 px-7 rounded-full border border-zinc-300/90 bg-white/80 hover:bg-white text-zinc-800 font-semibold text-base shadow-sm hover:shadow transition-all"
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-emerald-600" />
                  {t.hero?.ctaSecondary}
                </Button>
              </a>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {t.hero.highlights.map(label => <span key={label} className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800">{label}</span>)}
            </div>
          </div>

          {/* Hero Collage */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 relative max-w-6xl mx-auto"
          >
            <div className="relative z-10 mx-auto max-w-4xl rounded-2xl p-2 bg-gradient-to-b from-brand-200/60 via-brand-100/30 to-brand-200/40 shadow-2xl shadow-brand-950/10">
              <BrowserMockup
                src="/assets/screenshots/dashboard.webp"
                alt="Dashboard Eksekutif Sistem ERP & POS Toko Emas BerkahEmas"
                url="app.astaenterprise.id/dashboard"
                badge={t.gallery?.liveBadge || "Data demo"}
                priority={true}
              />
            </div>

            {/* Left Offset Screenshot Card */}
            <div className="hidden lg:block absolute -left-12 top-1/3 z-20 w-80 rounded-2xl p-1.5 bg-white/90 border border-brand-200/90 shadow-2xl shadow-brand-950/15 backdrop-blur-md transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <BrowserMockup
                src="/assets/screenshots/gold-price.webp"
                alt="Pengaturan harga emas BerkahEmas"
                url="app.astaenterprise.id/harga-emas"
                badge={lang === "en" ? "Demo data" : "Data demo"}
              />
            </div>

            {/* Right Offset Screenshot Card */}
            <div className="hidden lg:block absolute -right-12 top-1/4 z-20 w-80 rounded-2xl p-1.5 bg-white/90 border border-brand-200/90 shadow-2xl shadow-brand-950/15 backdrop-blur-md transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <BrowserMockup
                src="/assets/screenshots/pos.webp"
                alt="POS kasir BerkahEmas"
                url="app.astaenterprise.id/pos"
                badge={lang === "en" ? "Demo data" : "Data demo"}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PAIN POINTS SECTION */}
      {t.painPoints && (
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.painPoints.solutionTag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
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
                    className="rounded-2xl border border-brand-200/70 bg-white p-7 shadow-lg shadow-brand-950/[0.03] hover:shadow-xl hover:border-brand-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-700 shadow-sm">
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
        <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-[#F8F6EF] via-brand-50/30 to-[#F8F6EF] border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-28">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.nav?.features || "Fitur Unggulan"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
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
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
                      {feat.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-tight">
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
                    <div className="rounded-2xl p-2 bg-gradient-to-b from-brand-200/50 via-brand-100/20 to-brand-200/40 shadow-2xl shadow-brand-950/10">
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

      {/* 4. HOW IT WORKS SECTION */}
      {t.howItWorks && (
        <section id="how-it-works" className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.nav?.howItWorks || "Cara Kerja"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
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
                  className="rounded-2xl border border-brand-200/70 bg-white p-7 shadow-lg shadow-brand-950/[0.03] hover:shadow-xl hover:border-brand-400 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="text-3xl font-black text-brand-700 font-mono">
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

      {/* 5. INTERACTIVE MODULE GALLERY */}
      {galleryModules.length > 0 && (
        <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-[#F8F6EF] via-brand-50/20 to-[#F8F6EF] border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.nav?.gallery || "Galeri Modul"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
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
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md shadow-brand-600/25 scale-105"
                        : "bg-white text-zinc-700 border border-zinc-200/90 hover:border-brand-300 hover:text-zinc-950"
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border border-brand-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-brand-950/[0.04]">
                <div className="lg:col-span-5 space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
                    {galleryModules[activeTab].badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
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
                    <a href="#demo">
                      <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm px-6 shadow-md shadow-brand-600/20">
                        {t.nav.requestDemo}
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-2xl p-2 bg-gradient-to-b from-brand-200/50 via-brand-100/20 to-brand-200/40 shadow-xl">
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

      {/* 6. TESTIMONIALS SECTION */}
      {t.testimonials && (
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {lang === "id" ? "Testimoni Toko Emas" : "Customer Stories"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                {t.testimonials.title}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                {t.testimonials.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t.testimonials.items || []).map((testi) => (
                <div
                  key={testi.name}
                  className="rounded-2xl border border-brand-200/70 bg-white p-7 shadow-lg shadow-brand-950/[0.03] hover:shadow-xl hover:border-brand-400 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex gap-1 text-brand-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed italic">
                      "{testi.quote}"
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-brand-100 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {testi.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">{testi.name}</h3>
                      <p className="text-xs text-zinc-500">{testi.role} · {testi.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. PRICING SECTION (Live API + i18n Fallback) */}
      {t.pricing && (
        <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-[#F8F6EF] via-brand-50/30 to-[#F8F6EF] border-y border-brand-900/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.nav?.pricing || "Harga"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
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
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    tier.featured
                      ? "bg-white border-2 border-brand-500 shadow-2xl shadow-brand-900/10 scale-105 z-10"
                      : "bg-white/80 border border-brand-200/80 shadow-lg shadow-brand-950/[0.03] hover:border-brand-400"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-bold tracking-wider uppercase shadow-md">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">{tier.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1.5 min-h-[36px]">{tier.tagline}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950">{tier.price}</span>
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
                    <a href="#demo">
                      <Button
                        className={`w-full h-11 rounded-full font-bold text-sm transition-all ${
                          tier.featured
                            ? "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-md shadow-brand-600/25"
                            : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200"
                        }`}
                      >
                        {tier.ctaText}
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation Banner */}
            {t.pricing.banner && (
              <div className="mt-16 rounded-3xl border border-brand-300/80 bg-gradient-to-r from-brand-50 via-brand-50 to-brand-50 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl shadow-brand-900/5 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-200/80 text-brand-900">
                  {t.pricing.banner.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                  {t.pricing.banner.title}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
                  {t.pricing.banner.desc}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://wa.me/6285183003076?text=Halo%20BerkahEmas%2C%20saya%20tertarik%20konsultasi%20software%20toko%20emas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="h-12 px-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-600/25">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t.pricing.banner.cta}
                    </Button>
                  </a>
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
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-brand-700">
                {t.nav?.faq || "FAQ"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
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
                    className="rounded-2xl border border-brand-200/80 bg-white overflow-hidden shadow-sm hover:border-brand-400 transition-colors"
                  >
                    <button
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
                      <div className="px-6 pb-6 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-brand-100 pt-4 bg-brand-50/30 animate-fade-up">
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
      <section id="demo" className="py-20 md:py-28 bg-gradient-to-b from-[#F8F6EF] to-brand-100/40 border-t border-brand-900/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-700 text-white shadow-sm">
            {t.hero?.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            {t.hero?.titleStart}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600">
              {t.hero?.titleHighlight}
            </span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto">
            {t.hero?.subheadline}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6285183003076?text=Halo%20BerkahEmas%2C%20saya%20tertarik%20konsultasi%20software%20toko%20emas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-13 px-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-base shadow-[0_8px_25px_rgba(7,94,70,0.3)]">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.hero?.ctaPrimary}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
