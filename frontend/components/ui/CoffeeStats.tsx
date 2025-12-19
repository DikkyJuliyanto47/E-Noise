import { CoffeeType, DetectionData } from "@/lib/types";
import Badge from "@/components/ui/Badge";

export default function CoffeeStats({ history }: { history: DetectionData[] }) {
  const total = history.length;

  const counts: Record<CoffeeType, number> = {
    arabica: 0,
    robusta: 0,
    excelsa: 0,
  };

  history.forEach((h) => {
    counts[h.prediksi]++;
  });

  const pct = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100));

  const items: { type: CoffeeType; label: string }[] = [
    { type: "arabica", label: "Arabica" },
    { type: "robusta", label: "Robusta" },
    { type: "excelsa", label: "Excelsa" },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs text-slate-400">Distribusi Hasil Deteksi</div>

      {items.map((it) => {
        const n = counts[it.type];
        const p = pct(n);

        return (
          <div key={it.type} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge type={it.type} />
                <span className="text-sm text-slate-100 font-semibold">
                  {it.label}
                </span>
              </div>

              <div className="text-xs text-slate-300">
                {n}x • {p}%
              </div>
            </div>

            {/* bar */}
            <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/70"
                style={{ width: `${p}%` }}
              />
            </div>
          </div>
        );
      })}

      {total === 0 && (
        <div className="text-xs text-slate-500 pt-2">
          Statistik akan muncul setelah ada riwayat.
        </div>
      )}
    </div>
  );
}
