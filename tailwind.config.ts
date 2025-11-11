import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}) / 1)`;
  };
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        canvas: withOpacity("--color-canvas"),
        "canvas-soft": withOpacity("--color-canvas-soft"),
        surface: withOpacity("--color-surface"),
        "surface-muted": withOpacity("--color-surface-muted"),
        border: withOpacity("--color-border"),
        night: withOpacity("--color-night"),
        slate: withOpacity("--color-ink"),
        "slate-muted": withOpacity("--color-ink-muted"),
        frost: withOpacity("--color-frost"),
        primary: withOpacity("--color-primary"),
        accent: withOpacity("--color-accent"),
        support: withOpacity("--color-support"),
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 25px 70px rgba(0, 0, 0, 0.35)",
        glow: "0 0 120px rgba(0, 201, 119, 0.25)",
      },
      backdropBlur: {
        hero: "30px",
      },
      keyframes: {
        "pulse-subtle": {
          "0%,100%": { opacity: 0.65 },
          "50%": { opacity: 1 },
        },
        "dot-pulse": {
          "0%, 100%": { opacity: 0.4, transform: "scale(0.85)" },
          "50%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 6s ease-in-out infinite",
        "dot-pulse": "dot-pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
