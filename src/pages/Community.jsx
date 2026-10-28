import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { communityTiers } from "@/data/content";
import { Check } from "lucide-react";
import SEO from "@/components/SEO";

const benefitsList = [
  { en: "Private owner community", id: "Komunitas owner privat" },
  { en: "Weekly gold business insight", id: "Insight bisnis emas mingguan" },
  { en: "Monthly webinar", id: "Webinar bulanan" },
  { en: "SOP and business templates", id: "Template SOP & bisnis" },
  { en: "Early access to ERP features", id: "Akses awal fitur ERP" },
  { en: "Networking with gold business owners", id: "Networking pemilik bisnis emas" },
  { en: "Market update discussion", id: "Diskusi update pasar" },
  { en: "Business case study", id: "Studi kasus bisnis" },
];

export default function Community() {
  const { t, lang } = useApp();
  return (
    <div data-testid="community-page">
      <SEO
        title={lang === "id" ? "Komunitas Bisnis Emas Indonesia - BerkahEmas" : "Indonesia Gold Business Community - BerkahEmas"}
        description={lang === "id" ? "Bergabunglah dengan jaringan pengusaha, penaksir, dan peminat industri emas terbesar untuk berkolaborasi, belajar, dan tumbuh bersama." : "Join the largest network of gold industry entrepreneurs, appraisers, and enthusiasts to collaborate, learn, and grow together."}
        canonical="https://berkahemas.web.id/community"
        keywords="komunitas emas indonesia, asosiasi bisnis emas, jaringan toko emas, forum emas berkahemas, gold community indonesia, gold business network"
      />
      <section className="border-b border-border" data-testid="community-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.community.eyebrow}
            title={t.community.title}
            sub={t.community.sub}
            className="max-w-4xl"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border" data-testid="community-benefits">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionHeader
            eyebrow={lang === "id" ? "Manfaat" : "Benefits"}
            title={lang === "id" ? "Apa yang Anda dapatkan di dalam." : "What you get on the inside."}
          />
          <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl">
            {benefitsList.map((b, i) => (
              <li key={i} className="flex items-start gap-4 border-t border-border pt-5" data-testid={`community-benefit-${i}`}>
                <span className="font-mono text-xs text-muted-foreground mt-1.5">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl md:text-2xl tracking-tight">{b[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tiers */}
      <section className="border-b border-border bg-[hsl(var(--surface))]" data-testid="community-tiers">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionHeader
            eyebrow={lang === "id" ? "Membership" : "Membership"}
            title={lang === "id" ? "Tiga tingkat keanggotaan." : "Three tiers of membership."}
            align="center"
            className="mx-auto"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityTiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-lg p-8 lg:p-10 flex flex-col border ${
                  tier.highlighted
                    ? "border-[#5A0F1B] bg-background"
                    : "border-border bg-background"
                }`}
                data-testid={`community-tier-${tier.id}`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-8 inline-flex items-center bg-[#5A0F1B] text-[#F7F4EF] text-[10px] uppercase tracking-[0.22em] px-3 py-1 rounded-full">
                    {lang === "id" ? "Populer" : "Popular"}
                  </span>
                )}
                <h3 className="font-serif text-3xl tracking-tight">{tier.name[lang]}</h3>
                <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {tier.price[lang]}
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-[#5A0F1B] dark:text-[#CBB37E]" />
                      <span>{f[lang]}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-8">
                  <Button
                    data-testid={`community-tier-${tier.id}-cta`}
                    className={`w-full h-11 rounded-md ${
                      tier.highlighted
                        ? "bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF]"
                        : "bg-transparent border border-border hover:border-foreground text-foreground"
                    }`}
                  >
                    {t.community.join}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id" ? "Tumbuh bersama generasi berikutnya pemilik bisnis emas." : "Grow with the next generation of gold business owners."}
        subtitle={lang === "id" ? "Bergabung gratis dan dapatkan undangan untuk tier berikutnya." : "Join for free and get invited to the next tiers."}
        ctaLabel={t.community.join}
      />
    </div>
  );
}
