export default function SensorBar({
  label,
  value,
  colorClass,
  max = 1023,
}: {
  label: string;
  value: number;
  colorClass: string;
  max?: number;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-slate-100">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full transition-all ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
