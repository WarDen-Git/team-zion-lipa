import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Team Zion Lipa brand palette — adjust to your real brand colors
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd2ff",
          300: "#8eb4ff",
          400: "#598bff",
          500: "#3563f5",
          600: "#1f44ea",
          700: "#1733d6",
          800: "#192cad",
          900: "#1a2c88",
          950: "#141c52",
        },
        gold: {
          400: "#f3c969",
          500: "#e7b13e",
          600: "#cf962a",
          // Darker, WCAG-AA accessible gold for small text on light backgrounds
          700: "#8a5e12",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
