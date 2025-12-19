import { CoffeeMeta, CoffeeType } from "@/lib/types";

const COFFEE_META: Record<CoffeeType, CoffeeMeta> = {
  arabica: {
    label: "Arabica",
    ring: "ring-emerald-400/30",
    pill: "bg-emerald-400/10 text-emerald-100 border-emerald-400/40",
    glow: "shadow-[0_20px_60px_-20px_rgba(16,185,129,0.55)]",
    icon: "☕",
    accent: "text-emerald-200",
  },
  robusta: {
    label: "Robusta",
    ring: "ring-amber-400/30",
    pill: "bg-amber-400/10 text-amber-100 border-amber-400/40",
    glow: "shadow-[0_20px_60px_-20px_rgba(245,158,11,0.55)]",
    icon: "🫘",
    accent: "text-amber-200",
  },
  excelsa: {
    label: "Excelsa",
    ring: "ring-indigo-400/30",
    pill: "bg-indigo-400/10 text-indigo-100 border-indigo-400/40",
    glow: "shadow-[0_20px_60px_-20px_rgba(99,102,241,0.55)]",
    icon: "🌿",
    accent: "text-indigo-200",
  },
};

export function getCoffeeMeta(type: CoffeeType) {
  return COFFEE_META[type];
}

export default function Badge({ type }: { type: CoffeeType }) {
  const meta = COFFEE_META[type];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm border ${meta.pill}`}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}
