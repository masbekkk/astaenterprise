import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { aboutValues } from "@/data/content";
import SEO from "@/components/SEO";

export default function About() {
  const { t, lang } = useApp();
  return (
    <div data-testid="about-page">
      <SEO
        title={lang === "id" ? "Tentang Kami — Visi & Misi AstaEnterprise" : "About Us — Vision & Mission of AstaEnterprise"}
        description={lang === "id" ? "Kenali AstaEnterprise, pelopor digitalisasi dan modernisasi ekosistem industri bisnis emas di Indonesia." : "Get to know AstaEnterprise, the pioneer in digitizing and modernizing the gold business industry ecosystem in Indonesia."}
        canonical="https://astaenterprise.id/about"
        keywords="profil asta enterprise, pendiri asta emas, visi misi asta enterprise, tentang asta enterprise, asta enterprise profile"
      />
      <section className="border-b border-border" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {t.about.eyebrow}
          </span>
          <h1 className="mt-6 font-sans text-5xl md:text-6xl lg:text-7xl tracking-[-0.035em] leading-[1.0] text-balance max-w-4xl font-medium">
            {t.about.title}
          </h1>
          <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t.about.body}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-border" data-testid="about-mission-vision">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#5A0F1B] dark:text-[#CBB37E]">
              {t.about.missionLabel}
            </span>
            <p className="mt-5 font-editorial text-3xl md:text-4xl tracking-tight leading-[1.15] text-balance">
              {t.about.mission}
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#5A0F1B] dark:text-[#CBB37E]">
              {t.about.visionLabel}
            </span>
            <p className="mt-5 font-editorial text-3xl md:text-4xl tracking-tight leading-[1.15] text-balance">
              {t.about.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-[hsl(var(--surface))]" data-testid="about-values">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <SectionHeader
            eyebrow={t.about.valuesLabel}
            title={lang === "id" ? "Nilai yang membimbing kami." : "Values that guide us."}
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg border border-border overflow-hidden">
            {aboutValues.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="bg-background p-10 flex flex-col items-start"
                data-testid={`about-value-${i}`}
              >
                <span className="font-mono text-xs text-muted-foreground">/{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 font-serif text-3xl tracking-tight">{v[lang]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id" ? "Mari bangun masa depan bisnis emas bersama." : "Let's build the future of gold business together."}
        subtitle={lang === "id" ? "Hubungi kami untuk kemitraan, demo, atau diskusi terbuka." : "Reach out for partnerships, demos, or open conversations."}
      />
    </div>
  );
}
