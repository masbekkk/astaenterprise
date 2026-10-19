import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import BrowserMockup from "@/components/BrowserMockup";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { erpModules, erpBenefits, erpPricing } from "@/data/content";
import SEO from "@/components/SEO";

export default function ERPPage() {
  const { t, lang } = useApp();
  return (
    <div data-testid="erp-page" className="bg-[#FDFBF7] text-zinc-900 min-h-screen">
      <SEO
        title="Solusi ERP Bisnis Toko Emas & Berlian Enterprise - AstaEnterprise"
        description="Sistem ERP khusus bisnis emas. Modul POS retail, inventaris kadar & gramasi, buyback, transfer multi-cabang, dan laporan keuangan terintegrasi."
        canonical="https://berkahemas.web.id/"
        keywords="erp emas, software toko emas, aplikasi kasir emas, pos retail emas, manajemen gadai emas, inventory emas, gold erp, gold shop software"
      />
      {/* Hero */}
      <section className="border-b border-amber-900/10 relative overflow-hidden pt-12 pb-20" data-testid="erp-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-[0.24em] bg-amber-100 text-amber-800 border border-amber-200 font-semibold">
                Solusi ERP Toko Emas
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                ERP Khusus Bisnis Emas & Perhiasan Modern
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                Sistem ERP terpadu untuk mengelola POS kasir, inventaris kadar, kalkulasi buyback, mutasi gramasi fisik, dan operasional multi-cabang secara real-time.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a href="https://wa.me/6287777809578" target="_blank" rel="noopener noreferrer">
                  <Button
                    data-testid="erp-request-demo-button"
                    className="h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-7 shadow-lg shadow-amber-600/25"
                  >
                    Request Demo ERP
                  </Button>
                </a>
                <a href="#modules">
                  <Button
                    variant="ghost"
                    className="h-12 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 px-6 shadow-sm"
                    data-testid="erp-view-modules-button"
                  >
                    Lihat Modul
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <BrowserMockup
                src="/assets/screenshots/dashboard.webp"
                alt="Dashboard ERP AstaEnterprise"
                url="app.berkahemas.web.id/dashboard"
                badge="Live ERP"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="border-b border-border" data-testid="erp-modules">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionHeader
            eyebrow={lang === "id" ? "Modul" : "Modules"}
            title={t.erp.modulesTitle}
            sub={t.erp.modulesSub}
          />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {erpModules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 5) * 0.05 }}
                className="bg-background hover:bg-[hsl(var(--surface))] p-6 lg:p-8 transition-colors"
                data-testid={`erp-module-${i}`}
              >
                <span className="inline-flex h-10 w-10 rounded-md items-center justify-center border border-border text-foreground">
                  <Icon name={m.icon} className="h-4 w-4" />
                </span>
                <h3 className="mt-6 font-serif text-lg tracking-tight leading-snug">
                  {m.title[lang]}
                </h3>
                <span className="mt-3 inline-block font-mono text-[10px] text-muted-foreground">
                  /{String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border bg-[hsl(var(--surface))]" data-testid="erp-benefits">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionHeader
            eyebrow={lang === "id" ? "Manfaat" : "Benefits"}
            title={t.erp.benefitsTitle}
            sub={t.erp.benefitsSub}
          />
          <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {erpBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-4 border-t border-border pt-6" data-testid={`erp-benefit-${i}`}>
                <span className="font-mono text-xs text-muted-foreground mt-1">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl tracking-tight">{b[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b border-border" data-testid="erp-pricing">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionHeader
            eyebrow={lang === "id" ? "Harga" : "Pricing"}
            title={t.erp.pricingTitle}
            sub={t.erp.pricingSub}
            align="center"
            className="mx-auto"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {erpPricing.map((p) => (
              <div
                key={p.id}
                data-testid={`erp-pricing-${p.id}`}
                className={`rounded-lg border p-8 lg:p-10 flex flex-col ${p.highlighted
                    ? "border-[#5A0F1B] bg-background relative"
                    : "border-border bg-background"
                  }`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-8 inline-flex items-center bg-[#5A0F1B] text-[#F7F4EF] text-[10px] uppercase tracking-[0.22em] px-3 py-1 rounded-full">
                    {lang === "id" ? "Direkomendasikan" : "Recommended"}
                  </span>
                )}
                <h3 className="font-serif text-3xl tracking-tight">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground min-h-[64px]">{p.tagline[lang]}</p>
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t.common.comingSoon}
                  </span>
                  <div className="mt-1 font-serif text-3xl tracking-tight">{t.common.contactUs}</div>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-[#5A0F1B] dark:text-[#CBB37E]" />
                      <span>{f[lang]}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-8">
                  <Button
                    data-testid={`erp-pricing-${p.id}-cta`}
                    className={`w-full h-11 rounded-md text-sm ${p.highlighted
                        ? "bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF]"
                        : "bg-transparent border border-border hover:border-foreground text-foreground"
                      }`}
                  >
                    {t.common.contactUs}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id"
          ? "Siap mentransformasi operasional toko emas Anda?"
          : "Ready to transform your gold store operations?"}
        subtitle={lang === "id"
          ? "Jadwalkan demo dengan tim AstaEnterprise dan jelajahi platform ERP secara langsung."
          : "Schedule a demo with the AstaEnterprise team and explore the ERP platform live."}
      />
    </div>
  );
}
