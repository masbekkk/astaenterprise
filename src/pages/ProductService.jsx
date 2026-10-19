import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { services } from "@/data/content";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function ProductService() {
  const { t, lang } = useApp();
  return (
    <div data-testid="product-service-page">
      <SEO
        title={lang === "id" ? "Produk & Layanan Bisnis Emas - AstaEnterprise" : "Gold Business Products & Services - AstaEnterprise"}
        description={lang === "id" ? "Jelajahi ekosistem layanan AstaEnterprise mulai dari platform digital toko emas, sistem gadai, hingga manajemen pasok emas ritel." : "Explore the AstaEnterprise ecosystem, from digital gold shop platforms and pawn systems to retail gold supply chain management."}
        canonical="https://berkahemas.web.id/product-service"
        keywords="layanan asta enterprise, bisnis emas ritel, suplai emas, sistem manajemen emas, retail gold business, gold supply chain, gold management system"
      />
      <section className="border-b border-border" data-testid="product-service-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.products.eyebrow}
            title={t.products.title}
            sub={t.products.sub}
            className="max-w-4xl"
          />
        </div>
      </section>

      <section className="border-b border-border" data-testid="product-service-grid-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
            {services.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                className="group flex flex-col"
                data-testid={`product-service-card-${s.id}`}
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-muted border border-border">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.22em] text-white">
                    {String(i + 1).padStart(2, "0")} / 06
                  </span>
                </div>
                <div className="mt-7 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl tracking-tight">{s.title}</h3>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                      {s.desc[lang]}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#5A0F1B] dark:group-hover:text-[#CBB37E] transition-colors mt-2" />
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link to="/contact">
              <Button
                data-testid="product-service-explore-asta-button"
                className="h-12 rounded-md bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF] px-7"
              >
                {t.products.exploreAsta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id"
          ? "Sambungkan teknologi dengan ekosistem emas Anda."
          : "Connect technology with your gold ecosystem."}
        subtitle={lang === "id"
          ? "Pelajari bagaimana AstaEnterprise dan Asta Emas bekerja bersama."
          : "Discover how AstaEnterprise and Asta Emas work together."}
      />
    </div>
  );
}
