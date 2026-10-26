import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function WhatsAppButton({
  phoneNumber = "6285183003076",
}) {
  const [showTooltip, setShowTooltip] = useState(true);
  const { t, lang } = useApp();

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsapp.prefill)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-surface border border-brand-200/90 text-zinc-800 text-xs px-4 py-2.5 rounded-xl shadow-xl shadow-brand-900/10 backdrop-blur-md animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-semibold text-zinc-900">{t.whatsapp.tooltip}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-700 p-0.5 ml-1"
            aria-label={lang === 'en' ? 'Dismiss notification' : 'Tutup notifikasi'}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp-btn"
        className="relative group flex items-center justify-center h-14 w-14 rounded-full bg-primary hover:bg-brand-700 text-white shadow-md hover:-translate-y-1 transition-all duration-300 border-2 border-white"
        aria-label={lang === 'en' ? 'Contact us on WhatsApp' : 'Hubungi kami via WhatsApp'}
      >
        <MessageCircle className="h-7 w-7 text-gold fill-gold/10" />

      </a>
    </div>
  );
}
