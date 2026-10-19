import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, sub, align = "left", className = "" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.24em] text-muted-foreground"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans text-3xl md:text-4xl lg:text-5xl tracking-[-0.025em] leading-[1.05] mt-4 text-balance font-medium"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
