import * as Icons from "lucide-react";

// Render a lucide icon by name with fallback
export default function Icon({ name, className = "h-5 w-5 text-primary", strokeWidth = 1.5 }) {
  const Cmp = Icons[name] || Icons.Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
