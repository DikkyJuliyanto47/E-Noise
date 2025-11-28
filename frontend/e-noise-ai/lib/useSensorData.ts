"use client";

import { useQuery } from "@tanstack/react-query";

export function useSensorData() {
  return useQuery({
    queryKey: ["sensorData"],
    queryFn: async () => {
      const res = await fetch("/api/sensor");
      if (!res.ok) throw new Error("Failed to fetch sensor data");
      return res.json();
    },
    refetchInterval: 2000, // refresh setiap 2 detik
  });
}
