import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Dashboard Deteksi Aroma Kopi",
  description: "ESP32 + 3 Sensor MQ + Machine Learning",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
