"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Badge, { getCoffeeMeta } from "@/components/ui/Badge";
import StatChip from "@/components/ui/StatChip";
import SensorBar from "@/components/ui/SensorBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CoffeeType, DetectionData } from "@/lib/types";
import { formatDate, formatTime, pct } from "@/lib/utils";
import CoffeeDetailPanel from "@/components/ui/CoffeeDetailPanel";
import ConfidenceGauge from "@/components/ui/ConfidenceGauge";
import HistoryControls from "@/components/ui/HistoryControls";
import CoffeeStats from "@/components/ui/CoffeeStats";
import ToastHost, { ToastItem } from "@/components/ui/ToastHost";
import ChartsPanel from "@/components/ui/ChartsPanel";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  const [latest, setLatest] = useState<DetectionData>({
    prediksi: "arabica",
    confidence: 0.92,
    mq2: 320,
    mq7: 505,
    mq135: 265,
    timestamp: "",
  });

  const [history, setHistory] = useState<DetectionData[]>([]);
  const [connected, setConnected] = useState(false);

  const [filter, setFilter] = useState<CoffeeType | "all">("all");
  const [sortBy, setSortBy] = useState<"latest" | "conf-desc" | "conf-asc">(
    "latest"
  );

  // ✅ mode demo (tanpa ESP32)
  const [demoAuto, setDemoAuto] = useState(false);

  // ✅ Toast state
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = (t: Omit<ToastItem, "id" | "createdAt">) => {
    const id = crypto.randomUUID?.() ?? String(Date.now() + Math.random());
    setToasts((prev) =>
      [{ ...t, id, createdAt: Date.now() }, ...prev].slice(0, 4)
    );
  };

  const removeToast = (id: string) =>
    setToasts((prev) => prev.filter((x) => x.id !== id));

  // ✅ Export CSV riwayat
  const handleExportCsv = () => {
    if (history.length === 0) {
      pushToast({
        kind: "warn",
        title: "Tidak ada data",
        message: "Riwayat masih kosong, belum bisa diexport.",
        durationMs: 2500,
      });
      return;
    }

    const header = [
      "timestamp_iso",
      "waktu",
      "tanggal",
      "jenis_kopi",
      "confidence",
      "mq2",
      "mq7",
      "mq135",
    ];

    const rows = history.map((h) => [
      h.timestamp || "",
      h.timestamp ? formatTime(h.timestamp) : "",
      h.timestamp ? formatDate(h.timestamp) : "",
      h.prediksi,
      h.confidence.toFixed(3),
      h.mq2,
      h.mq7,
      h.mq135,
    ]);

    const csvLines = [
      header.join(","),
      ...rows.map((r) =>
        r
          .map((v) => {
            const s = String(v ?? "");
            if (s.includes(",") || s.includes('"') || s.includes("\n")) {
              return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
          })
          .join(",")
      ),
    ];

    const blob = new Blob([csvLines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `riwayat_deteksi_kopi_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    pushToast({
      kind: "success",
      title: "Export CSV",
      message: "Riwayat berhasil diexport.",
      durationMs: 2500,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ✅ WebSocket ke server di laptop (kalau nanti dipakai lagi)
  useEffect(() => {
    // ganti IP ini kalau IP laptop berubah
    const ws = new WebSocket("ws://10.230.110.9:8080");

    ws.onopen = () => {
      console.log("WS connected");
      setConnected(true);
      pushToast({
        kind: "info",
        title: "WebSocket tersambung",
        message: "ESP32 siap mengirim data.",
        durationMs: 2000,
      });
    };

    ws.onclose = () => {
      console.log("WS disconnected");
      setConnected(false);
      pushToast({
        kind: "warn",
        title: "WebSocket terputus",
        message: "Cek koneksi WiFi / server WS.",
        durationMs: 2500,
      });
    };

    ws.onerror = (err) => {
      console.error("WS error", err);
      setConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string) as {
          prediksi: string;
          confidence: number;
          mq2: number;
          mq7: number;
          mq135: number;
        };

        // mapping label dari ESP ke CoffeeType
        const rawLabel = msg.prediksi ?? "";
        const upper = rawLabel.trim().toUpperCase();
        let pred: CoffeeType = "arabica";
        if (upper.startsWith("ARAB")) pred = "arabica";
        else if (upper.startsWith("ROB")) pred = "robusta";
        else if (upper.startsWith("EXC")) pred = "excelsa";

        const next: DetectionData = {
          prediksi: pred,
          confidence: msg.confidence ?? 0,
          mq2: msg.mq2 ?? 0,
          mq7: msg.mq7 ?? 0,
          mq135: msg.mq135 ?? 0,
          timestamp: new Date().toISOString(),
        };

        setLatest(next);
        setHistory((h) => [next, ...h].slice(0, 8));
      } catch (e) {
        console.error("Invalid WS message", e);
      }
    };

    return () => ws.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const meta = useMemo(() => getCoffeeMeta(latest.prediksi), [latest.prediksi]);

  const displayHistory = useMemo(() => {
    let data = history;

    if (filter !== "all") {
      data = data.filter((h) => h.prediksi === filter);
    }

    if (sortBy === "conf-desc") {
      data = [...data].sort((a, b) => b.confidence - a.confidence);
    } else if (sortBy === "conf-asc") {
      data = [...data].sort((a, b) => a.confidence - b.confidence);
    }

    return data;
  }, [history, filter, sortBy]);

  // ✅ helper: buat data demo random
  const makeDemoDetection = (): DetectionData => {
    const types: CoffeeType[] = ["arabica", "robusta", "excelsa"];
    const prediksi = types[Math.floor(Math.random() * types.length)];
    const confidence = Number((0.75 + Math.random() * 0.25).toFixed(2));

    return {
      prediksi,
      confidence,
      mq2: Math.floor(250 + Math.random() * 250),
      mq7: Math.floor(300 + Math.random() * 300),
      mq135: Math.floor(200 + Math.random() * 250),
      timestamp: new Date().toISOString(),
    };
  };

  const handleDemoOnce = () => {
    const next = makeDemoDetection();
    setLatest(next);
    setHistory((h) => [next, ...h].slice(0, 8));
    pushToast({
      kind: "info",
      title: "Demo sampel",
      message: "Satu sampel demo ditambahkan ke dashboard.",
      durationMs: 2200,
    });
  };

  // ✅ auto demo interval (kalau demoAuto = true)
  useEffect(() => {
    if (!demoAuto) return;

    const id = setInterval(() => {
      const next = makeDemoDetection();
      setLatest(next);
      setHistory((h) => [next, ...h].slice(0, 8));
    }, 3000);

    return () => clearInterval(id);
  }, [demoAuto]);

  // ✅ Trigger toast saat prediksi berubah / confidence rendah
  useEffect(() => {
    if (!latest.timestamp) return; // masih SSR / belum jalan di client

    pushToast({
      kind: "success",
      title: "Deteksi baru",
      coffeeType: latest.prediksi,
      message: `Terdeteksi ${latest.prediksi} dengan confidence ${pct(
        latest.confidence
      )}.`,
      durationMs: 2600,
    });

    if (latest.confidence < 0.7) {
      pushToast({
        kind: "warn",
        title: "Confidence rendah",
        message: "Coba ulangi sampel atau stabilkan sensor.",
        durationMs: 3200,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latest.prediksi, latest.confidence, latest.timestamp]);

  return (
    <main className="h-screen w-full overflow-hidden">
      {/* HEADER STICKY */}
      <div className="sticky top-0 z-40 bg-[#07090d]/80 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <Header
            title="Dashboard Deteksi Aroma Kopi"
            subtitle="ESP32 + 3 Sensor MQ + Machine Learning (Arabica / Robusta / Excelsa)"
            rightSlot={
              <div
                className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium
                ${
                  connected
                    ? "bg-emerald-400/10 text-emerald-100 border-emerald-400/40"
                    : "bg-rose-400/10 text-rose-100 border-rose-400/40"
                }`}
              >
                Status: {connected ? "Connected" : "Disconnected"}
              </div>
            }
          />
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-88px)] px-4 sm:px-6 py-4 sm:py-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
          {/* LEFT SCROLL */}
          <section className="h-full overflow-y-auto pr-1 space-y-6">
            {/* DETEKSI TERBARU */}
            <Card className={`p-5 sm:p-6 ring-1 ${meta.ring} ${meta.glow}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="text-xs sm:text-sm text-slate-400">
                    Deteksi Terbaru
                  </div>
                  <div
                    className={`mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight ${meta.accent}`}
                  >
                    {meta.label}
                  </div>
                </div>
                <Badge type={latest.prediksi} />
              </div>

              {/* STAT CHIPS */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                <StatChip title="Confidence" value={pct(latest.confidence)} />
                <StatChip
                  title="Waktu"
                  value={
                    mounted && latest.timestamp
                      ? formatTime(latest.timestamp)
                      : "--:--:--"
                  }
                />
                <StatChip
                  title="Tanggal"
                  value={
                    mounted && latest.timestamp
                      ? formatDate(latest.timestamp)
                      : "--/--/----"
                  }
                />
              </div>

              {/* GAUGE + SENSOR */}
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-5 items-start">
                <ConfidenceGauge value={latest.confidence} />

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-100">Nilai Sensor</h3>
                  <SensorBar
                    label="MQ-2"
                    value={latest.mq2}
                    colorClass="bg-emerald-500"
                  />
                  <SensorBar
                    label="MQ-7"
                    value={latest.mq7}
                    colorClass="bg-amber-500"
                  />
                  <SensorBar
                    label="MQ-135"
                    value={latest.mq135}
                    colorClass="bg-indigo-500"
                  />
                </div>
              </div>
            </Card>

            {/* ✅ CHARTS */}
            <ChartsPanel data={displayHistory} latest={latest} />

            {/* SIDE CARDS 2 KOL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-5 space-y-4">
                <h3 className="font-semibold text-slate-100">
                  Statistik Deteksi
                </h3>

                <CoffeeStats history={history} />

                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-slate-400 mb-2">
                    Ringkasan Sistem
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-200/90 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Model</span>
                      <span className="font-medium">Klasifikasi 3 kelas</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Sensor</span>
                      <span className="font-medium">MQ-2, MQ-7, MQ-135</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Device</span>
                      <span className="font-medium">ESP32</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold text-slate-100 mb-3">
                  Keterangan Warna
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge type="arabica" />
                  <Badge type="robusta" />
                  <Badge type="excelsa" />
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-3">
                  Badge mengikuti hasil deteksi realtime.
                </p>
                <div className="mt-4 space-y-4 text-xs sm:text-sm">
                  <div className="flex gap-3 items-start">
                    <Badge type="arabica" />
                    <p className="text-slate-300 leading-relaxed">
                      Memiliki aroma <b>fruity</b> dan <b>floral</b> dengan
                      tingkat keasaman tinggi. Pola gas cenderung ringan dan
                      kompleks.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Badge type="robusta" />
                    <p className="text-slate-300 leading-relaxed">
                      Aroma <b>earthy</b>, <b>pahit</b>, dan kuat. Umumnya
                      menghasilkan respons sensor gas yang lebih intens.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Badge type="excelsa" />
                    <p className="text-slate-300 leading-relaxed">
                      Aroma <b>spicy</b> dan <b>smoky</b> dengan karakter unik
                      dan kompleks, berada di antara Arabica dan Robusta.
                    </p>
                  </div>

                  <p className="pt-2 text-[11px] text-slate-500">
                    Model machine learning mempelajari pola gas dari karakter
                    aroma ini untuk menentukan jenis kopi.
                  </p>
                </div>
              </Card>
            </div>

            {/* ✅ MODE DEMO CARD */}
            <Card className="p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-100">
                  Mode Demo (Tanpa ESP32)
                </h3>
                <button
                  type="button"
                  onClick={() => setDemoAuto((v) => !v)}
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg border
                    ${
                      demoAuto
                        ? "border-emerald-400/60 text-emerald-100 bg-emerald-400/10"
                        : "border-slate-500/60 text-slate-200 hover:bg-white/5"
                    }`}
                >
                  {demoAuto ? "Auto Demo: ON" : "Auto Demo: OFF"}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Gunakan mode demo saat ESP32 tidak terhubung. Sistem akan
                menghasilkan data simulasi untuk latihan presentasi dan testing
                tampilan.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDemoOnce}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-sky-400/60 text-sky-100 hover:bg-sky-400/10"
                >
                  Generate 1 Sampel
                </button>
                <span className="text-[11px] text-slate-500">
                  Status demo:{" "}
                  <span className="font-medium text-slate-200">
                    {demoAuto ? "Auto (tiap 3 detik)" : "Manual"}
                  </span>
                </span>
              </div>
            </Card>

            {/* RIWAYAT */}
            <Card className="p-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold text-slate-100 text-base sm:text-lg">
                    Riwayat Deteksi (8 terakhir)
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCsv}
                      className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-emerald-400/50 text-emerald-100 hover:bg-emerald-400/10"
                    >
                      Export CSV
                    </button>
                    <button
                      onClick={() => setHistory([])}
                      className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-100"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <HistoryControls
                  filter={filter}
                  setFilter={setFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onReset={() => {
                    setFilter("all");
                    setSortBy("latest");
                  }}
                />
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] w-full text-xs sm:text-sm">
                  <thead className="text-left text-slate-400">
                    <tr>
                      <th className="py-2">Waktu</th>
                      <th>Jenis Kopi</th>
                      <th>Confidence</th>
                      <th>MQ-2</th>
                      <th>MQ-7</th>
                      <th>MQ-135</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayHistory.map((h, i) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="py-2 text-slate-200">
                          {mounted && h.timestamp
                            ? formatTime(h.timestamp)
                            : "--:--:--"}
                        </td>
                        <td>
                          <Badge type={h.prediksi} />
                        </td>
                        <td className="text-slate-200">{pct(h.confidence)}</td>
                        <td className="text-slate-200">{h.mq2}</td>
                        <td className="text-slate-200">{h.mq7}</td>
                        <td className="text-slate-200">{h.mq135}</td>
                      </tr>
                    ))}

                    {displayHistory.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-slate-500"
                        >
                          Tidak ada data sesuai filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            <Footer />
          </section>

          {/* RIGHT STICKY */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 space-y-6">
              <CoffeeDetailPanel type={latest.prediksi} />

              <Card className="p-5">
                <h3 className="font-semibold text-slate-100 mb-2">
                  Catatan Demo
                </h3>
                <p className="text-xs text-slate-200/90 leading-relaxed">
                  Panel kanan ini selalu tampil untuk memudahkan pembacaan hasil
                  saat presentasi. Nanti ketika realtime aktif, panel akan
                  mengikuti hasil deteksi dari alat.
                </p>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* ✅ TOAST HOST */}
      <ToastHost toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
