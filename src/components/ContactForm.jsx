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

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      });

      setState("success");
    } catch (err) {
      console.error("Spreadsheet submission error:", err);
      setState("idle");
      setError(t.common.somethingWrong);
    }
  };

  if (state === "success") {
    return (
      <div
        data-testid="contact-success"
        className="rounded-lg border border-border bg-[hsl(var(--surface))] p-8 md:p-10 flex items-start gap-4"
      >
        <span className="inline-flex h-9 w-9 rounded-full items-center justify-center bg-[#5A0F1B] text-[#F7F4EF]">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-serif text-2xl tracking-tight">{t.common.thanks}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "id"
              ? "Tim AstaEnterprise akan membalas dalam dua hari kerja."
              : "The AstaEnterprise team will respond within two business days."}
          </p>
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
            value={form.email}
            onChange={onChange("email")}
            data-testid="contact-input-email"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.phone} required>
          <Input
            required
            value={form.phone}
            onChange={onChange("phone")}
            data-testid="contact-input-phone"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.businessName} required>
          <Input
            required
            value={form.business_name}
            onChange={onChange("business_name")}
            data-testid="contact-input-business-name"
            className="h-11 rounded-md"
          />
        </Field>
        <Field label={t.contact.businessType} required className="md:col-span-2">
          <Select value={form.business_type} onValueChange={onChange("business_type")}>
            <SelectTrigger className="h-11 rounded-md" data-testid="contact-select-business-type">
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

      {error && (
        <p className="mt-4 text-sm text-destructive" data-testid="contact-error">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          {lang === "id"
            ? "Dengan mengirim, Anda setuju dihubungi oleh tim AstaEnterprise."
            : "By submitting, you agree to be contacted by the AstaEnterprise team."}
        </p>
        <Button
          type="submit"
          disabled={state === "loading"}
          data-testid="contact-submit-button"
          className="h-11 rounded-md bg-[#5A0F1B] hover:bg-[#7A1A28] text-[#F7F4EF] px-6 text-sm tracking-wide"
        >
          {state === "loading" ? "…" : t.contact.submitInquiry}
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
        {required && <span className="ml-0.5 text-[#5A0F1B] dark:text-[#CBB37E]">·</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
