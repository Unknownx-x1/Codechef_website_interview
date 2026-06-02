import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0A",
          900: "#111111",
          800: "#222222",
          100: "#F0F0F0",
          500: "#888888",
        },
        acid: "#E8FF47",
        paper: "#F5F5F0",
        warning: "#FF4747",
      },
      fontFamily: {
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        cursor: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        cursor: "cursor 1s steps(1, end) infinite",
        scan: "scan 3.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
