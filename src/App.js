import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import PageShell from "@/components/PageShell";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner";

function RouteLanguageSync() {
  const location = useLocation();
  const { lang, setLang } = useApp();

  useEffect(() => {
    const isEnRoute = location.pathname === "/en" || location.pathname.startsWith("/en/");
    if (isEnRoute && lang !== "en") {
      setLang("en");
    } else if (!isEnRoute && lang === "en") {
      setLang("id");
    }
  }, [location.pathname, lang, setLang]);

  return null;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <RouteLanguageSync />
        <PageShell>
          <Routes>
            {/* Single Page Architecture */}
            {/* Indonesian (Default) */}
            <Route path="/" element={<Home />} />

            {/* English (/en) */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/*" element={<Home />} />

            {/* Fallback to single page */}
            <Route path="*" element={<Home />} />
          </Routes>
        </PageShell>
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
