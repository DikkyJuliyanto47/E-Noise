import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
extend: {
  colors: {
    primary: "#d4a76b",
    accent: "#ffe0b3",
    bg: "#0f0d0a",
    card: "#1c1a16",
    text: "#e5dcc5",
  },
  borderRadius: {
    card: "20px",
  },
}
  },
  plugins: [],
};
export default config;
