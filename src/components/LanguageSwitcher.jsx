import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { code: "id", label: "ID" },
    { code: "en", label: "EN" },
  ];

  const handleLanguageSelect = (targetLang) => {
    if (targetLang === lang) return;

    setLang(targetLang);

    const currentPath = location.pathname;
    const search = location.search || "";
    const hash = location.hash || "";

    let newPath = "/";

    if (targetLang === "en") {
      // Switching to English
      if (currentPath === "/" || currentPath === "") {
        newPath = "/en";
      } else if (!currentPath.startsWith("/en")) {
        newPath = `/en${currentPath.startsWith("/") ? "" : "/"}${currentPath}`;
      } else {
        newPath = currentPath;
      }
    } else {
      // Switching to Indonesian (Default root)
      if (currentPath === "/en" || currentPath === "/en/") {
        newPath = "/";
      } else if (currentPath.startsWith("/en/")) {
        newPath = currentPath.replace(/^\/en/, "") || "/";
      } else {
        newPath = currentPath;
      }
    }

    navigate(`${newPath}${search}${hash}`);
  };

  return (
    <div
      data-testid="language-switcher"
      className={`relative inline-flex items-center p-1 rounded-full bg-white/95 border border-zinc-200/90 shadow-sm shadow-brand-900/[0.04] backdrop-blur-sm select-none ${className}`}
      role="group"
      aria-label="Pilih Bahasa / Select Language"
    >
      {options.map((opt) => {
        const isActive = lang === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => handleLanguageSelect(opt.code)}
            aria-pressed={isActive}
            className={`relative min-h-[36px] min-w-[38px] px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 rounded-full z-10 flex items-center justify-center ${
              isActive ? "text-white" : "text-zinc-700 hover:text-zinc-950"
            }`}
          >
            {/* Morphing active gradient pill background */}
            {isActive && (
              <motion.div
                layoutId="activeLangPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 shadow-md shadow-brand-500/25 -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
