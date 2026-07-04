import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(169 74% 10%)",
        foreground: "hsl(54 100% 96%)",
        card: {
          DEFAULT: "hsl(169 50% 13%)",
          foreground: "hsl(54 100% 96%)",
        },
        primary: {
          DEFAULT: "hsl(158 64% 26%)",
          foreground: "hsl(54 100% 96%)",
        },
        accent: {
          DEFAULT: "hsl(61 75% 57%)",
          foreground: "hsl(169 74% 10%)",
        },
        muted: {
          DEFAULT: "hsl(169 40% 18%)",
          foreground: "hsl(60 20% 75%)",
        },
        border: "hsl(169 40% 20%)",
        brand: {
          yellow: "#e1e440",
          dark: "#072e27",
          green: "#186e4f",
          cream: "#fffdec",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        aurora: "aurora 20s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
