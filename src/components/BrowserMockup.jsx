import React from "react";
import { Lock } from "lucide-react";

export default function BrowserMockup({
  src,
  alt = "BerkahEmas ERP Screenshot",
  title = "BerkahEmas — Software Toko Emas",
  url = "app.berkahemas.web.id/dashboard",
  badge = "Data demo",
  className = "",
  glow = false,
  children,
  aspectRatio = "aspect-[16/10]",
  priority = false,
}) {
  return (
    <div
      className={`relative group rounded-xl p-1 transition-all duration-500 ${
        glow
          ? "bg-gradient-to-b from-brand-300/40 via-brand-100/30 to-transparent shadow-[0_20px_60px_-15px_rgba(16,45,80,0.18)]"
          : "bg-gradient-to-b from-zinc-200/80 to-zinc-100/50 shadow-sm shadow-black/[0.04]"
      } ${className}`}
    >
      {/* Outer ambient soft color wash */}
      {glow && (
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-brand-200/40 via-brand-100/30 to-brand-300/30 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        />
      )}

      {/* Main browser container */}
      <div className="rounded-xl overflow-hidden border border-zinc-200/90 bg-surface shadow-sm flex flex-col">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2.5 bg-zinc-100/90 border-b border-zinc-200/80 select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-brand-500 inline-block" />
            <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gold inline-block" />
            <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-brand-300 inline-block" />
          </div>

          {/* Address / URL Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-zinc-200 text-[11px] md:text-xs text-zinc-600 max-w-[200px] sm:max-w-xs md:max-w-md truncate font-mono shadow-sm">
            <Lock className="h-3 w-3 text-brand-600 shrink-0" />
            <span className="text-zinc-700 truncate">{url}</span>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2">
            {badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Browser Content Area */}
        <div className={`relative w-full bg-zinc-950 overflow-hidden ${aspectRatio}`}>
          {src ? (
            <picture>
              <source srcSet={src.replace(/\.png$/, ".webp")} type="image/webp" />
              <img
                src={src}
                alt={alt}
                width={1440}
                height={900}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding={priority ? "sync" : "async"}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </picture>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
