"use client";

import DetectedAromaCard from "./components/cards/DetectedAromaCard";
import SensorChart from "./components/cards/SensorChart";
import LiveSensorTable from "./components/cards/LiveSensorTable";

export default function Home() {
  return (
    <div className="space-y-10">

      {/* TOP STATUS ROW */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#CDAF6F] tracking-wide">
            Dashboard
          </h2>
          <p className="text-sm text-[#A9A9A9] opacity-70">
            Monitoring coffee aroma detection in real-time
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#1F1F1F] px-4 py-2 rounded-full border border-[#2B2B2B]">
          <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></span>
          <p className="text-sm text-[#B5B5B5]">ESP32 Connected</p>
        </div>
      </div>

      {/* GRID CARDS */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* ⬇️ Replace placeholder — now using real component */}
        <DetectedAromaCard />

        {/* Sensor Readings */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2B2B2B] hover:border-[#CDAF6F] transition">
          <p className="text-sm opacity-60 mb-2">Sensor Data</p>
          <h3 className="text-xl font-semibold text-[#CDAF6F]">Sensor Readings</h3>
        </div>

        {/* Live Table */}
      <LiveSensorTable />

        {/* Chart */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2B2B2B] hover:border-[#CDAF6F] transition">
          <p className="text-sm opacity-60 mb-2">Analytics</p>
          <h3 className="text-xl font-semibold text-[#CDAF6F]">Sensor Chart</h3>
        </div>
          {/* ⬇️ Chart now using real component */}
        <SensorChart />

        {/* History Log */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2B2B2B] hover:border-[#CDAF6F] transition xl:col-span-3">
          <p className="text-sm opacity-60 mb-2">Records</p>
          <h3 className="text-xl font-semibold text-[#CDAF6F]">Detection History</h3>
        </div>

      </section>
    </div>
  );
}
