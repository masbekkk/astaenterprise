import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { books } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import SEO from "@/components/SEO";

const accents = {
  maroon: { bg: "bg-[#5A0F1B]", text: "text-[#F7F4EF]", sub: "text-[#CBB37E]" },
  gold: { bg: "bg-[#B89B5E]", text: "text-[#0B0B0B]", sub: "text-[#5A0F1B]" },
  neutral: { bg: "bg-[#0B0B0B]", text: "text-[#F7F4EF]", sub: "text-[#CBB37E]" },
};

export default function Books() {
  const { t, lang } = useApp();
  return (
    <div data-testid="books-page">
      <SEO
        title={lang === "id" ? "Buku & Publikasi Bisnis Emas - BerkahEmas" : "Gold Business Books & Publications - BerkahEmas"}
        description={lang === "id" ? "Koleksi panduan, modul, dan buku referensi industri emas terlengkap yang ditulis oleh para ahli di BerkahEmas." : "The most comprehensive collection of gold industry guides, modules, and reference books written by experts at BerkahEmas."}
        canonical="https://berkahemas.web.id/books"
        keywords="buku bisnis emas, modul taksir emas, panduan investasi emas, buku berkahemas, gold business books, gold appraisal module, gold investment guide"
      />
      <section className="border-b border-border" data-testid="books-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.books.eyebrow}
            title={t.books.title}
            sub={t.books.sub}
            className="max-w-4xl"
          />
        </div>
      </section>

      <section className="border-b border-border bg-[hsl(var(--surface))]" data-testid="books-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {books.map((b, i) => {
              const a = accents[b.accent] || accents.neutral;
              return (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
                  className="group"
                  data-testid={`book-card-${b.id}`}
                >
                  <div
                    className={`relative aspect-[3/4] rounded-md overflow-hidden ${a.bg} ${a.text} p-7 flex flex-col justify-between shadow-[0_25px_60px_-20px_rgba(11,11,11,0.35)] transition-transform duration-500 group-hover:-translate-y-1`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase tracking-[0.24em] ${a.sub}`}>
                        BerkahEmas
                      </span>
                      <BookOpen className="h-4 w-4 opacity-80" />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl leading-[1.05] tracking-tight">{b.title}</h3>
                      <p className={`mt-3 text-xs ${a.sub} uppercase tracking-[0.2em]`}>
                        {b.subtitle[lang]}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase opacity-70">
                      <span>Vol. {String(i + 1).padStart(2, "0")}</span>
                      <span>{b.pages} pp.</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-serif text-lg">{b.title}</span>
                    <span className="text-xs text-muted-foreground">{t.common.comingSoon}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/contact">
              <Button
                data-testid="books-notify-button"
                className="h-11 rounded-md bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF] px-6"
              >
                {lang === "id" ? "Beri tahu saya saat tersedia" : "Notify me when available"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id" ? "Codified playbook untuk bisnis emas modern." : "Codified playbooks for modern gold businesses."}
        subtitle={lang === "id" ? "Praktis, ringkas, dan siap dieksekusi." : "Practical, concise, and ready to execute."}
      />
    </div>
  );
}
