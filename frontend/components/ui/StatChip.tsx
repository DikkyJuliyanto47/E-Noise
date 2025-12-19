export default function StatChip({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[11px] sm:text-xs text-slate-400">{title}</div>
      <div className="text-base sm:text-lg font-semibold text-slate-100">
        {value}
      </div>
    </div>
  );
}
