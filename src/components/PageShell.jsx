import { motion, MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CursorFollower from "@/components/CursorFollower";

export default function PageShell({ children }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user"><div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed left-4 top-3 z-[60] rounded-md bg-surface px-4 py-3 text-sm font-semibold text-primary shadow-md">{pathname.startsWith('/en') ? 'Skip to content' : 'Lewati ke konten'}</a>
      <Navbar />
      <motion.main
        id="main-content"
        tabIndex={-1}
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppButton />
      <CursorFollower />
    </div></MotionConfig>
  );
}
