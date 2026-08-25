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
          900: "#171716", // Primary text deep charcoal
          700: "#3d3c39",
          500: "#6e6c67",
          400: "#94928d",
          300: "#bfbcb5",
          200: "#e4e1d9",
          100: "#f0eee8",
        },
        accent: {
          DEFAULT: "#e05822", // Restrained warm terracotta/orange
          hover: "#c84714",
          light: "#fff4ed",
          muted: "#fbe4d6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.14em",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
