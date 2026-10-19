import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { translations } from "@/i18n/translations";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("asta-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "id";
    const pathname = window.location.pathname;
    if (pathname.startsWith("/en")) return "en";
    const saved = localStorage.getItem("asta-lang");
    if (saved === "en" || saved === "id") return saved;
    return "id";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("asta-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("asta-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "id" : "en")), []);

  const t = useMemo(() => translations[lang] || translations.id, [lang]);

  const value = useMemo(
    () => ({ theme, lang, toggleTheme, toggleLang, setTheme, setLang, t }),
    [theme, lang, toggleTheme, toggleLang, t]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
