import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { businessTypes } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ArrowRight } from "lucide-react";
import brand from "@/data/brand";

export default function ContactForm() {
  const { t, lang } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    business_type: "",
    message: "",
  });
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e?.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.business_type) {
      setError(t.contact.selectType);
      return;
    }
    setState("loading");
    try {
      const url = process.env.REACT_APP_SPREADSHEET_URL;
      if (!url) {
        throw new Error("Spreadsheet URL is not configured in .env");
      }
      const sameOrigin = new URL(url, window.location.href).origin === window.location.origin;

      const response = await fetch(url, {
        method: "POST",
        mode: sameOrigin ? "same-origin" : "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      });

      // A no-cors response is opaque: the request may have reached the service,
      // but the browser cannot verify that it was accepted.
      setState(response.ok && response.type !== 'opaque' ? "success" : "unconfirmed");
    } catch {
      setState("idle");
      setError(t.contact.failed);
    }
  };

  if (state === "success") {
    return (
      <div role="status" aria-live="polite"
        data-testid="contact-success"
        className="rounded-lg border border-border bg-[hsl(var(--surface))] p-8 md:p-10 flex items-start gap-4"
      >
        <span className="inline-flex h-9 w-9 rounded-full items-center justify-center bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-serif text-2xl tracking-tight">{t.contact.confirmed}</h3>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid="contact-form"
      className="rounded-lg border border-border bg-background p-6 md:p-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={t.contact.name} required>
          <Input
            required
            autoComplete="name"
            value={form.name}
            onChange={onChange("name")}
            data-testid="contact-input-name"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.email} required>
          <Input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={onChange("email")}
            data-testid="contact-input-email"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.phone} required>
          <Input
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={onChange("phone")}
            data-testid="contact-input-phone"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.businessName} required>
          <Input
            required
            autoComplete="organization"
            value={form.business_name}
            onChange={onChange("business_name")}
            data-testid="contact-input-business-name"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.businessType} required className="md:col-span-2">
          <Select value={form.business_type} onValueChange={onChange("business_type")}>
            <SelectTrigger className="h-11 rounded-md" aria-label={t.contact.businessType} aria-required="true" data-testid="contact-select-business-type">
              <SelectValue placeholder={t.contact.selectType} />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((b) => (
                <SelectItem key={b.value} value={b.value} data-testid={`contact-option-${b.value}`}>
                  {b[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label={t.contact.message} required className="md:col-span-2">
          <Textarea
            required
            value={form.message}
            onChange={onChange("message")}
            rows={5}
            data-testid="contact-input-message"
            className="rounded-md"
          />
        </Field>
      </div>

      {(error || state === 'unconfirmed') && <div role="status" aria-live="polite" className="mt-4 text-sm text-destructive" data-testid="contact-error">
        <p>{error || t.contact.unconfirmed}</p>
        {state === 'unconfirmed' && <a className="mt-2 inline-block font-semibold underline underline-offset-4" href={`https://wa.me/${brand.BRAND.whatsapp}?text=${encodeURIComponent(t.whatsapp.prefill)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
      </div>}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          {lang === "id"
            ? "Dengan mengirim, Anda setuju dihubungi oleh tim BerkahEmas."
            : "By submitting, you agree to be contacted by the BerkahEmas team."}
        </p>
        <Button
          type="submit"
          disabled={state === "loading"}
          data-testid="contact-submit-button"
          className="h-11 rounded-md bg-primary hover:bg-brand-700 text-primary-foreground px-6 text-sm tracking-wide"
        >
          {state === "loading" ? t.contact.sending : t.contact.submitInquiry}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary">·</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
