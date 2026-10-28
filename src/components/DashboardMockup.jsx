import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, TrendingDown, Boxes, Coins, Building2, Wallet } from "lucide-react";

// Premium dark-UI dashboard mockup that pops on light backgrounds
// Built entirely with Tailwind + tiny SVGs (no images)
export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      data-testid="dashboard-mockup"
    >
      {/* Soft halo */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[28px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 30%, rgba(184,155,94,0.18), transparent 60%), radial-gradient(50% 50% at 80% 80%, rgba(90,15,27,0.18), transparent 60%)",
        }}
      />

      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl overflow-hidden border border-[#1f1f22] shadow-[0_30px_80px_-20px_rgba(11,11,11,0.35)] bg-[#0B0B0B] text-[#F7F4EF]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1c1c1f]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3d]" />
          </div>
          <div className="text-[11px] tracking-[0.2em] text-[#8a8a8e] uppercase">
            BerkahEmas · owner dashboard
          </div>
          <div className="text-[11px] text-[#8a8a8e] font-mono">v1.0</div>
        </div>

        <div className="p-5 grid grid-cols-12 gap-3.5">
          {/* Gold price */}
          <Card className="col-span-12 md:col-span-5">
            <Header icon={<Coins className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Gold Price · 24K" subtitle="IDR / gram" />
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="font-serif text-3xl tracking-tight">1.842.500</div>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400">
                  <TrendingUp className="h-3 w-3" /> +1,24% today
                </div>
              </div>
              <Sparkline up />
            </div>
          </Card>

          {/* Revenue */}
          <Card className="col-span-6 md:col-span-4">
            <Header icon={<Wallet className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Revenue · MTD" />
            <div className="mt-3 font-serif text-2xl tracking-tight">Rp 1,82 B</div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +8,4%
            </div>
            <Bars values={[40, 52, 38, 61, 73, 65, 88]} />
          </Card>

          {/* Inventory */}
          <Card className="col-span-6 md:col-span-3">
            <Header icon={<Boxes className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Inventory" />
            <div className="mt-3 font-serif text-2xl tracking-tight">12.847 g</div>
            <div className="mt-1 text-[11px] text-[#8a8a8e]">3.214 items · 4 branches</div>
            <Donut percent={72} />
          </Card>

          {/* Buyback */}
          <Card className="col-span-6 md:col-span-4">
            <Header icon={<TrendingDown className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Buyback · Today" />
            <div className="mt-3 font-serif text-2xl tracking-tight">Rp 184 jt</div>
            <div className="mt-1 text-[11px] text-[#8a8a8e]">23 transactions</div>
          </Card>

          {/* Branch performance */}
          <Card className="col-span-12 md:col-span-5">
            <Header icon={<Building2 className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Branch performance" />
            <div className="mt-3 space-y-2">
              {[
                { name: "Bandung · Pasar Baru", v: 92 },
                { name: "Jakarta · Kelapa Gading", v: 78 },
                { name: "Surabaya · Tunjungan", v: 64 },
                { name: "Medan · Petisah", v: 51 },
              ].map((b) => (
                <div key={b.name} className="flex items-center gap-3">
                  <div className="text-[11px] text-[#cfcfd2] w-44 truncate">{b.name}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-[#1c1c1f] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7A1A28] to-[#CBB37E]"
                      style={{ width: `${b.v}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-mono text-[#8a8a8e] w-8 text-right">{b.v}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Profit report */}
          <Card className="col-span-12 md:col-span-3">
            <Header icon={<ArrowUpRight className="h-3.5 w-3.5 text-[#CBB37E]" />} title="Profit · MTD" />
            <div className="mt-3 font-serif text-2xl tracking-tight">Rp 318 jt</div>
            <div className="mt-1 text-[11px] text-emerald-400">Margin 17,4%</div>
            <Bars values={[20, 32, 28, 41, 45, 52, 58, 62]} thin />
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-[#1f1f22] bg-[#111114] p-4 ${className}`}>
      {children}
    </div>
  );
}

function Header({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#8a8a8e]">
        {icon}
        <span>{title}</span>
      </div>
      {subtitle && <span className="text-[10px] text-[#6b6b70] font-mono">{subtitle}</span>}
    </div>
  );
}

function Sparkline({ up }) {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-28">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#CBB37E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#CBB37E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={up ? "M0 28 L12 22 L24 24 L36 18 L48 20 L60 14 L72 16 L84 10 L96 12 L108 6 L120 8 L120 36 L0 36 Z" : "M0 8 L12 12 L24 10 L36 16 L48 14 L60 20 L72 18 L84 24 L96 22 L108 28 L120 26 L120 36 L0 36 Z"}
        fill="url(#sg)"
      />
      <path
        d={up ? "M0 28 L12 22 L24 24 L36 18 L48 20 L60 14 L72 16 L84 10 L96 12 L108 6 L120 8" : "M0 8 L12 12 L24 10 L36 16 L48 14 L60 20 L72 18 L84 24 L96 22 L108 28 L120 26"}
        fill="none"
        stroke="#CBB37E"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function Bars({ values, thin }) {
  const max = Math.max(...values);
  return (
    <div className={`mt-3 flex items-end gap-1 ${thin ? "h-10" : "h-14"}`}>
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-[#7A1A28] to-[#CBB37E]"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.55 + (i / values.length) * 0.45 }}
        />
      ))}
    </div>
  );
}

function Donut({ percent }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const off = c - (percent / 100) * c;
  return (
    <div className="mt-3 flex items-center justify-between">
      <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
        <circle cx="24" cy="24" r={r} stroke="#1c1c1f" strokeWidth="5" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={r}
          stroke="#CBB37E"
          strokeWidth="5"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-right">
        <div className="font-mono text-xs text-[#cfcfd2]">{percent}%</div>
        <div className="text-[10px] text-[#6b6b70]">capacity</div>
      </div>
    </div>
  );
}
