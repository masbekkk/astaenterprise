import { motion, MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CursorFollower from "@/components/CursorFollower";

export default function PageShell({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user"><div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <Navbar />
      <motion.main
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
