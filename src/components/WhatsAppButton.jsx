import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function WhatsAppButton({
  phoneNumber = "6285183003076",
}) {
  const [showTooltip, setShowTooltip] = useState(true);
  const { t } = useApp();

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsapp.prefill)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white border border-brand-200/90 text-zinc-800 text-xs px-4 py-2.5 rounded-xl shadow-xl shadow-brand-900/10 backdrop-blur-md animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-zinc-900">{t.whatsapp.tooltip}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-700 p-0.5 ml-1"
            aria-label="Tutup notifikasi"
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
        className="relative group flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white"
        aria-label="Hubungi kami via WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white/10" />

        {/* Pulsing radar ring */}
        <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/25 animate-ping -z-10 pointer-events-none" />
      </a>
    </div>
  );
}
