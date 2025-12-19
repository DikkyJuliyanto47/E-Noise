import { CoffeeType } from "@/lib/types";

type SortBy = "latest" | "conf-desc" | "conf-asc";

export default function HistoryControls({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  onReset,
}: {
  filter: CoffeeType | "all";
  setFilter: (v: CoffeeType | "all") => void;
  sortBy: SortBy;
  setSortBy: (v: SortBy) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      {/* Filter */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Filter</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as CoffeeType | "all")}
          className="bg-white/5 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-white/10"
        >
          <option value="all">Semua</option>
          <option value="arabica">Arabica</option>
          <option value="robusta">Robusta</option>
          <option value="excelsa">Excelsa</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Sort</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="bg-white/5 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-white/10"
        >
          <option value="latest">Terbaru</option>
          <option value="conf-desc">Confidence tertinggi</option>
          <option value="conf-asc">Confidence terendah</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="sm:ml-auto px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-slate-100 transition"
      >
        Reset
      </button>
    </div>
  );
}
