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
          900: "#111827", // Main editorial dark
          950: "#0c0c0b",
        },
        ink: {
          900: "#111827", // Primary deep ink text
          800: "#1f2937",
          700: "#374151", // Primary body & subheads
          600: "#4b5563", // Secondary editorial text
          500: "#525d6e", // Metadata labels & captions (contrast >= 6.2:1)
          400: "#667085", // Supporting text / subtle labels (contrast >= 4.7:1)
          300: "#d8d5cd", // Decorative borders & separators
          200: "#e5e2da", // Card & table border hairlines
          100: "#f0eee8", // Subtle card inner fill
          50: "#f7f6f2",  // Lightest warm wash
        },
        accent: {
          DEFAULT: "#2563eb", // Coastal Blue (contrast 4.88:1 on #FAF8F5, 5.17:1 on #FFF)
          hover: "#1d4ed8",   // Deep coastal blue
          soft: "#eaf2ff",    // Soft coastal blue background
          border: "#c9dbff",  // Coastal blue hairline border
          light: "#eaf2ff",
          muted: "#d8e5ff",
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
