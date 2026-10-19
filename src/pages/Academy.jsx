import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { courses } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";

export default function Academy() {
  const { t, lang } = useApp();
  return (
    <div data-testid="academy-page">
      <SEO
        title={lang === "id" ? "Asta Academy — Edukasi & Pelatihan Bisnis Emas" : "Asta Academy — Gold Business Education & Training"}
        description={lang === "id" ? "Kembangkan keahlian Anda dalam industri emas. Pelatihan taksiran emas, sertifikasi, regulasi, dan manajemen operasional toko emas." : "Develop your expertise in the gold industry. Gold appraisal training, certification, regulations, and gold shop operations management."}
        canonical="https://berkahemas.web.id/academy"
        keywords="belajar taksiran emas, pelatihan bisnis emas, asta academy, sekolah emas, sertifikasi taksir emas, gold appraisal training, gold appraiser certification"
      />
      <section className="border-b border-border" data-testid="academy-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.academy.eyebrow}
            title={t.academy.title}
            sub={t.academy.sub}
            className="max-w-4xl"
          />
          <div className="mt-10">
            <Link to="/contact">
              <Button
                data-testid="academy-waitlist-button"
                className="h-12 rounded-md bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF] px-6"
              >
                {t.academy.joinWaitlist}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border" data-testid="academy-courses">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className="group flex flex-col rounded-lg border border-border bg-background hover:border-foreground/40 hover-card-lift overflow-hidden"
                data-testid={`academy-course-${c.id}`}
              >
                <div className="relative aspect-[16/9] bg-[#0B0B0B] overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(70% 70% at 30% 30%, rgba(184,155,94,0.22), transparent 60%), radial-gradient(50% 50% at 80% 80%, rgba(90,15,27,0.35), transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-[#F7F4EF]">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#CBB37E]">
                      {lang === "id" ? "Kursus" : "Course"} · {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-[#cfcfd2]">{c.level[lang]}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl tracking-tight leading-snug">
                    {c.title[lang]}
                  </h3>
                  <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
                    <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {c.lessons} {lang === "id" ? "pelajaran" : "lessons"}</span>
                  </div>
                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#5A0F1B] dark:text-[#CBB37E]">
                      {t.common.comingSoon}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={lang === "id" ? "Tingkatkan operasional. Tingkatkan owner." : "Level up operations. Level up owners."}
        subtitle={lang === "id" ? "Daftar daftar tunggu untuk mendapatkan akses awal ke Academy." : "Join the waitlist for early access to the Academy."}
        ctaLabel={t.academy.joinWaitlist}
      />
    </div>
  );
}
