import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        foreground: "#DFE2F1",
        bank: {
          dark: "#080C14",
          surface: "#0F131D",
          card: "#141926",
          cardHover: "#1B2234",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(59, 130, 246, 0.25)",
          emerald: "#10B981",
          emeraldLight: "#34D399",
          emeraldDim: "rgba(16, 185, 129, 0.12)",
          sapphire: "#3B82F6",
          sapphireLight: "#60A5FA",
          sapphireDark: "#1D4ED8",
          sapphireDim: "rgba(59, 130, 246, 0.15)",
          gold: "#F59E0B",
          goldDim: "rgba(245, 158, 11, 0.12)",
          crimson: "#EF4444",
          crimsonDim: "rgba(239, 68, 68, 0.15)",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "Courier New", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glowSapphire: "0 0 20px -3px rgba(59, 130, 246, 0.4)",
        glowEmerald: "0 0 20px -3px rgba(16, 185, 129, 0.4)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
