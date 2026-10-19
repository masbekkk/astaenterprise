import { useApp } from "@/context/AppContext";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { Mail, MessageCircle, Instagram, MapPin } from "lucide-react";
import SEO from "@/components/SEO";

export default function Contact() {
  const { t, lang } = useApp();

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "astaenterprisegroup@gmail.com",
      href: "mailto:astaenterprisegroup@gmail.com",
      testid: "contact-channel-email",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+62 851-8300-3076",
      href: "https://wa.me/6285183003076",
      testid: "contact-channel-whatsapp",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@astaenterprise.id",
      href: "https://www.instagram.com/astaenterprise.id",
      testid: "contact-channel-instagram",
    },
    {
      icon: MapPin,
      label: lang === "id" ? "Lokasi" : "Location",
      value: "Jl. Kadaka No.1 Kota Malang",
      href: "#",
      testid: "contact-channel-location",
    },
  ];

  return (
    <div data-testid="contact-page">
      <SEO
        title={lang === "id" ? "Hubungi Kami — Layanan Kemitraan AstaEnterprise" : "Contact Us — Partner Services of AstaEnterprise"}
        description={lang === "id" ? "Konsultasikan kebutuhan sistem ERP atau kemitraan bisnis emas Anda dengan tim ahli kami di AstaEnterprise." : "Consult your gold business ERP needs or partnership inquiries with our expert team at AstaEnterprise."}
        canonical="https://astaenterprise.id/contact"
        keywords="kontak asta enterprise, alamat asta emas, kemitraan bisnis emas, call center asta enterprise, contact asta enterprise"
      />
      <section className="border-b border-border" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            sub={t.contact.sub}
            className="max-w-4xl"
          />
        </div>
      </section>

      <section className="border-b border-border" data-testid="contact-content">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5">
            <h3 className="font-serif text-2xl tracking-tight">
              {lang === "id" ? "Saluran langsung." : "Direct channels."}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              {lang === "id"
                ? "Pilih cara yang paling nyaman untuk Anda."
                : "Choose whichever channel works best for you."}
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-testid={c.testid}
                    className="flex items-center justify-between gap-6 py-5 group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 rounded-md items-center justify-center border border-border text-foreground group-hover:border-[#5A0F1B] group-hover:text-[#5A0F1B] dark:group-hover:text-[#CBB37E] dark:group-hover:border-[#CBB37E] transition-colors">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {c.label}
                        </div>
                        <div className="mt-1 font-serif text-xl tracking-tight">{c.value}</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
