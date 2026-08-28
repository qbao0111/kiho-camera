import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          50: "#fcfbf9",
          100: "#faf8f5", // Main warm off-white background
          200: "#f3efe9",
          300: "#e9e4dc",
          400: "#dcd4c8",
          800: "#1e1e1c",
          900: "#141413", // Main editorial dark
          950: "#0c0c0b",
        },
        ink: {
          900: "#141413", // Primary deep ink text
          800: "#222220",
          700: "#3d3c39",
          600: "#55534e",
          500: "#6e6c67",
          400: "#94928d",
          300: "#bfbcb5",
          200: "#e4e1d9",
          100: "#f0eee8",
          50: "#f7f6f2",
        },
        accent: {
          DEFAULT: "#d95d39", // Restrained warm terracotta/burnt orange
          hover: "#c14c29",
          light: "#fbf0ec",
          muted: "#f4ded7",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "Be Vietnam Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        serif: [
          "var(--font-display)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.03em",
        wider: "0.06em",
        widest: "0.12em",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
export default config;
