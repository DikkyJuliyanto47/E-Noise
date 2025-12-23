"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { CoffeeType, DetectionData } from "@/lib/types";
import { pct } from "@/lib/utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

type Props = {
  data: DetectionData[]; // pakai displayHistory dari page.tsx
  latest?: DetectionData; // optional untuk highlight
};

function shortTime(ts?: string) {
  if (!ts) return "--:--";
  try {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  } catch {
    return "--:--";
  }
}

export default function ChartsPanel({ data, latest }: Props) {
  // data chart sensor: ambil max 8 terakhir, urutkan tua->baru biar garis enak dibaca
  const sensorSeries = [...data]
    .slice(0, 8)
    .reverse()
    .map((d, idx) => ({
      idx: idx + 1,
      t: shortTime(d.timestamp),
      mq2: d.mq2,
      mq7: d.mq7,
      mq135: d.mq135,
    }));

  // count kelas kopi dari data (displayHistory sudah terfilter)
  const counts = { arabica: 0, robusta: 0, excelsa: 0 };
  for (const d of data) {
    counts[d.prediksi] = (counts[d.prediksi] ?? 0) + 1;
  }
  const classSeries = (["arabica", "robusta", "excelsa"] as CoffeeType[]).map(
    (k) => ({
      key: k,
      label: k,
      value: counts[k],
    })
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* LINE CHART SENSOR */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-100">Tren Nilai Sensor</h3>
            <p className="text-xs text-slate-400 mt-1">
              8 sampel terakhir (MQ-2, MQ-7, MQ-135)
            </p>
          </div>

          {latest && (
            <div className="flex items-center gap-2">
              <Badge type={latest.prediksi} />
              <div className="text-xs text-slate-300">
                conf <span className="font-semibold">{pct(latest.confidence)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorSeries}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="t" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#e2e8f0",
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Line
                type="monotone"
                dataKey="mq2"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="mq7"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="mq135"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Tooltip menampilkan nilai sensor per sampel.
        </p>
      </Card>

      {/* BAR CHART FREKUENSI KELAS */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-100">Distribusi Prediksi</h3>
            <p className="text-xs text-slate-400 mt-1">
              Jumlah prediksi per jenis kopi (berdasarkan filter riwayat)
            </p>
          </div>
        </div>

        <div className="mt-4 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classSeries}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#e2e8f0",
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge type="arabica" />
          <Badge type="robusta" />
          <Badge type="excelsa" />
        </div>
      </Card>
    </div>
  );
}
