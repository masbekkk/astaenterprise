import { useState } from "react";
import axios from "axios";
import { ArrowRight, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NewsletterForm({ source = "footer", className = "" }) {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      await axios.post(`${API}/newsletter`, { email, source });
      setState("success");
      setMessage(t.common.thanks);
      setEmail("");
    } catch (err) {
      if (err?.response?.status === 409) {
        setState("success");
        setMessage(t.common.alreadySubscribed);
      } else {
        setState("error");
        setMessage(t.common.somethingWrong);
      }
    }
  };

  if (state === "success") {
    return (
      <div
        data-testid="newsletter-success"
        className={`flex items-center gap-2 text-sm text-foreground ${className}`}
      >
        <Check className="h-4 w-4 text-[#5A0F1B] dark:text-[#CBB37E]" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`relative w-full ${className}`} data-testid="newsletter-form">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.common.enterEmail}
        data-testid="newsletter-email-input"
        className="w-full h-12 pl-4 pr-14 bg-transparent border-b border-foreground/30 focus:border-foreground outline-none text-sm placeholder:text-muted-foreground transition-colors"
      />
      <button
        type="submit"
        data-testid="newsletter-submit-button"
        aria-label={t.common.subscribe}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md inline-flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
        disabled={state === "loading"}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      {state === "error" && (
        <p className="mt-2 text-xs text-destructive" data-testid="newsletter-error">
          {message}
        </p>
      )}
    </form>
  );
}
