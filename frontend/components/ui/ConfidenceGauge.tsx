import { useMemo } from "react";

export default function ConfidenceGauge({
  value, // 0..1
}: {
  value: number;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));

  const { label, color, glow } = useMemo(() => {
    if (pct >= 85) {
      return {
        label: "High Confidence",
        color: "bg-emerald-500",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.55)]",
      };
    }
    if (pct >= 70) {
      return {
        label: "Medium Confidence",
        color: "bg-amber-500",
        glow: "shadow-[0_0_30px_rgba(245,158,11,0.55)]",
      };
    }
    return {
      label: "Low Confidence",
      color: "bg-rose-500",
      glow: "shadow-[0_0_30px_rgba(244,63,94,0.55)]",
    };
  }, [pct]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400">Confidence Gauge</div>
          <div className="mt-1 text-lg font-bold text-slate-100">
            {pct}%
          </div>
          <div className="text-xs text-slate-300">{label}</div>
        </div>

        {/* Lingkaran gauge sederhana */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-white/10" />
          <div
            className={`absolute inset-1 rounded-full ${color} ${glow}`}
            style={{
              clipPath: `conic-gradient(#000 ${pct}%, transparent 0)`,
              mask: "radial-gradient(circle, transparent 55%, black 56%)",
              WebkitMask:
                "radial-gradient(circle, transparent 55%, black 56%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center text-xs font-semibold text-slate-100">
            {pct}%
          </div>
        </div>
      </div>

      {/* Bar indikator kecil */}
      <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}
