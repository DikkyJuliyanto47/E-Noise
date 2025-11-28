"use client";

interface SensorRecord {
  id: number;
  timestamp: string;
  value: number;
  prediction: string;
}

export default function LiveSensorTable() {
  const data: SensorRecord[] = [
    { id: 1, timestamp: "19:41:03", value: 245, prediction: "Arabica Sweet" },
    { id: 2, timestamp: "19:41:05", value: 221, prediction: "Robusta Strong" },
    { id: 3, timestamp: "19:41:07", value: 230, prediction: "Wet Fermentation" }
  ];

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2B2B2B] hover:border-[#CDAF6F] transition overflow-auto">

      <p className="text-sm opacity-60 mb-2">Live Stream</p>
      <h3 className="text-xl font-semibold text-[#CDAF6F] mb-4">Sensor Table</h3>

      <table className="w-full text-left text-sm">
        <thead className="text-[#CDAF6F] border-b border-[#2B2B2B]">
          <tr>
            <th className="py-2">Time</th>
            <th>Value</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-[#2B2B2B] hover:bg-[#222]">
              <td className="py-2">{row.timestamp}</td>
              <td>{row.value}</td>
              <td className="text-[#CDAF6F]">{row.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
