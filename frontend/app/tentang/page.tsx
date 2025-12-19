import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tentang Project | Deteksi Aroma Kopi",
};

export default function TentangProject() {
  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Tentang Project
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Alat Pendeteksi Aroma Kopi Berbasis ESP32 & Machine Learning
          </p>
        </div>

        <Link
          href="/"
          className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-slate-100 transition"
        >
          ← Kembali
        </Link>
      </header>

      {/* ringkasan */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
            Deskripsi Singkat
          </h2>
          <p className="mt-3 text-slate-200/90 text-sm leading-relaxed">
            Project ini membangun alat pendeteksi aroma biji kopi untuk membedakan
            tiga jenis kopi: <b>Arabica</b>, <b>Robusta</b>, dan <b>Excelsa</b>.
            Sistem menggunakan tiga sensor gas seri MQ sebagai input, kemudian data
            diproses oleh model machine learning pada ESP32 untuk menghasilkan
            klasifikasi jenis kopi secara realtime.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">Jenis Kopi</div>
              <div className="text-slate-100 font-semibold mt-1">
                Arabica, Robusta, Excelsa
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">Perangkat Utama</div>
              <div className="text-slate-100 font-semibold mt-1">ESP32</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-slate-400">Sensor</div>
              <div className="text-slate-100 font-semibold mt-1">
                MQ-2, MQ-7, MQ-135
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Spesifikasi Sistem
          </h2>
          <ul className="mt-3 text-sm text-slate-200/90 space-y-2">
            <li>• Mikrokontroler: ESP32</li>
            <li>• Sensor gas: MQ-2, MQ-7, MQ-135</li>
            <li>• Output: label + confidence</li>
            <li>• Komunikasi: WebSocket (local)</li>
            <li>• Dashboard: Next.js + Tailwind</li>
          </ul>
        </Card>
      </section>

      {/* foto alat */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
          Foto Alat
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Taruh file di folder <code className="text-slate-200">/public</code> dengan nama yang sama.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video relative">
            <Image
              src="/alat-1.jpg"
              alt="Foto alat deteksi kopi tampak depan"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-video relative">
            <Image
              src="/alat-2.jpg"
              alt="Foto alat deteksi kopi tampak samping"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Card>

      {/* diagram arsitektur */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
          Diagram Arsitektur Sistem
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Alur data: sensor → ML (ESP32) → WebSocket → Dashboard.
        </p>

        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-16/7 relative">
          <Image
            src="/diagram-arsitektur.jpg"
            alt="Diagram arsitektur sistem deteksi aroma kopi"
            fill
            className="object-contain p-4"
          />
        </div>

        <ol className="mt-4 text-sm text-slate-200/90 space-y-2 list-decimal ml-5">
          <li>Sensor MQ membaca pola gas/aroma kopi.</li>
          <li>ESP32 melakukan preprocessing / normalisasi.</li>
          <li>Model ML memprediksi jenis kopi (3 kelas).</li>
          <li>ESP32 mengirim hasil ke server WebSocket lokal.</li>
          <li>Dashboard menampilkan hasil realtime + riwayat.</li>
        </ol>
      </Card>

      {/* ML & evaluasi */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
            Cara Kerja Machine Learning
          </h2>
          <ul className="mt-3 text-sm text-slate-200/90 space-y-2">
            <li>• Input fitur: MQ-2, MQ-7, MQ-135.</li>
            <li>• Preprocessing: smoothing/normalisasi sesuai rancanganmu.</li>
            <li>• Model klasifikasi 3 kelas.</li>
            <li>• Output: label + confidence.</li>
            <li>• Inference berjalan langsung di ESP32.</li>
          </ul>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
            Evaluasi & Akurasi Model
          </h2>
          <p className="mt-3 text-sm text-slate-200/90">
            Ringkasan performa model dari dataset pengujian aroma kopi.
          </p>

          {/* ganti nilainya sesuai hasilmu */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-xs text-slate-400">Akurasi</div>
              <div className="text-2xl font-bold text-slate-100 mt-1">92%</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-xs text-slate-400">Precision</div>
              <div className="text-2xl font-bold text-slate-100 mt-1">0.91</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-xs text-slate-400">Recall</div>
              <div className="text-2xl font-bold text-slate-100 mt-1">0.90</div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            *Sesuaikan angka berdasarkan evaluasi modelmu.
          </p>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
