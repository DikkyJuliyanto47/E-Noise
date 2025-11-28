import { useQuery } from "@tanstack/react-query";

export function useSensorData() {
  return useQuery({
    queryKey: ["sensor"],
    queryFn: async () => {
      const res = await fetch("/api/sensor");
      if (!res.ok) throw new Error("Failed to fetch sensor data");
      return res.json();
    },
    refetchInterval: 2000, // fetch tiap 2 detik
  });
}
