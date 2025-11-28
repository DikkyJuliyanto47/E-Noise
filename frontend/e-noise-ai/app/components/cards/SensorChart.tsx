"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SensorChart() {
  const [data, setData] = useState<any[]>([]);

  // Simulasi stream data (nanti diganti ESP32 realtime)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(-20), // hanya simpan 20 titik agar chart smooth
        {
          time: new Date().toLocaleTimeString().slice(3, 8), // HH:MM
          MQ2: Math.random() * 2000,
          MQ3: Math.random() * 2000,
          MQ135: Math.random() * 2000,
        },
      ]);
    }, 1500); // update tiap 1.5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2B2B2B]">
      <p className="text-sm opacity-60 mb-2">Analytics</p>
      <h3 className="text-xl font-semibold text-[#CDAF6F] mb-4">Live Sensor Chart</h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#777" />
          <YAxis stroke="#777" />

          <Tooltip 
            contentStyle={{ background: "#111", border: "1px solid #CDAF6F" }}
            labelStyle={{ color: "#CDAF6F" }}
          />

          <Line type="monotone" dataKey="MQ2" stroke="#CDAF6F" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="MQ3" stroke="#8b7440" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="MQ135" stroke="#5b4c2b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
