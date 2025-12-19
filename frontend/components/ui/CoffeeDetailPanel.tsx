import Card from "@/components/ui/Card";
import { CoffeeType } from "@/lib/types";
import Badge from "@/components/ui/Badge";

type CoffeeDetail = {
  title: string;
  subtitle: string;
  aromaNotes: string[];
  tasteNotes: string[];
  originHint: string;
  sensorHint: string;
  hue: string; // class warna ringan biar match theme
  emoji: string;
};

const DETAILS: Record<CoffeeType, CoffeeDetail> = {
  arabica: {
    title: "Arabica",
    subtitle: "Aroma halus, kompleks, dan cenderung fruity/floral.",
    aromaNotes: ["Floral", "Fruity", "Citrus", "Caramel"],
    tasteNotes: ["Asam lembut", "Manis natural", "Body medium"],
    originHint: "Umumnya tumbuh di dataran tinggi, rasa lebih kompleks.",
    sensorHint:
      "Biasanya menghasilkan pola gas yang stabil dengan variasi halus antar MQ.",
    hue: "border-emerald-400/30 bg-emerald-400/5",
    emoji: "☕",
  },
  robusta: {
    title: "Robusta",
    subtitle: "Aroma kuat, earthy, dan lebih ‘bold’. Kafein tinggi.",
    aromaNotes: ["Nutty", "Earthy", "Dark chocolate", "Woody"],
    tasteNotes: ["Pahit kuat", "Body tebal", "Aftertaste panjang"],
    originHint: "Banyak tumbuh di dataran rendah, rasa lebih tegas.",
    sensorHint:
      "Cenderung memicu respons gas lebih tinggi pada MQ tertentu.",
    hue: "border-amber-400/30 bg-amber-400/5",
    emoji: "🫘",
  },
  excelsa: {
    title: "Excelsa",
    subtitle: "Aroma unik, perpaduan fruity dan spicy, karakter ‘tart’.",
    aromaNotes: ["Spicy", "Tart fruit", "Smoky", "Tea-like"],
    tasteNotes: ["Asam tajam khas", "Body ringan–medium", "Finish clean"],
    originHint: "Sering jadi ‘blend enhancer’ karena profilnya unik.",
    sensorHint:
      "Pola MQ bisa terlihat kontras (naik-turun lebih ‘tajam’).",
    hue: "border-indigo-400/30 bg-indigo-400/5",
    emoji: "🌿",
  },
};

export default function CoffeeDetailPanel({ type }: { type: CoffeeType }) {
  const d = DETAILS[type];

  return (
    <Card className={`p-5 sm:p-6 border ${d.hue}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">Profil Kopi Terdeteksi</div>
          <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {d.emoji} {d.title}
          </h3>
          <p className="mt-2 text-sm text-slate-200/90 leading-relaxed">
            {d.subtitle}
          </p>
        </div>
        <Badge type={type} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Aroma notes */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-slate-100 mb-2">
            Aroma dominan
          </div>
          <div className="flex flex-wrap gap-2">
            {d.aromaNotes.map((a) => (
              <span
                key={a}
                className="px-2.5 py-1 rounded-lg text-xs border border-white/10 bg-white/5 text-slate-100"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Taste notes */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-slate-100 mb-2">
            Karakter rasa
          </div>
          <ul className="text-xs sm:text-sm text-slate-200/90 space-y-1">
            {d.tasteNotes.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extra info */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-slate-400">Catatan asal & karakter</div>
          <div className="text-sm text-slate-100 mt-1 leading-relaxed">
            {d.originHint}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-slate-400">Hint pola sensor</div>
          <div className="text-sm text-slate-100 mt-1 leading-relaxed">
            {d.sensorHint}
          </div>
        </div>
      </div>
    </Card>
  );
}
