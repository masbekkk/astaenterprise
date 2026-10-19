import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function CTASection({ title, subtitle, ctaLabel = "Request Demo", to = "/contact" }) {
  const { t } = useApp();
  return (
    <section className="relative bg-[#0B0B0B] text-[#F7F4EF] overflow-hidden" data-testid="cta-section">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 20%, rgba(184,155,94,0.12), transparent 60%), radial-gradient(50% 50% at 20% 90%, rgba(122,26,40,0.18), transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.24em] text-[#CBB37E]">
            {t.nav.requestDemo}
          </span>
          <h2 className="mt-5 font-sans text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.03em] text-balance font-medium">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-base md:text-lg text-[#cfcfd2] max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={to}>
              <Button
                data-testid="cta-request-demo-button"
                className="h-11 rounded-md bg-[#F7F4EF] hover:bg-white text-[#0B0B0B] text-sm tracking-wide px-6"
              >
                {ctaLabel || t.nav.requestDemo}
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                data-testid="cta-secondary-button"
                className="h-11 rounded-md border border-[#2a2a2d] hover:border-[#CBB37E] hover:bg-transparent text-[#F7F4EF] text-sm tracking-wide px-6"
              >
                {t.common.learnMore}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
