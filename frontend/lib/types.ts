export type CoffeeType = "arabica" | "robusta" | "excelsa";

export type DetectionData = {
  prediksi: CoffeeType;
  confidence: number;
  mq2: number;
  mq7: number;
  mq135: number;
  timestamp: string;
  device_id?: string;
};

export type CoffeeMeta = {
  label: string;
  ring: string;
  pill: string;
  glow: string;
  icon: string;
  accent: string;
};
