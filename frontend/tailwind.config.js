/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070d",
        surface: "#0b1120",
        panel: "#0e1526",
        border: "#1b2740",
        cyan: {
          glow: "#00e5ff",
        },
        violet: {
          glow: "#7c5cff",
        },
        mint: "#22d3a5",
        muted: "#8a93a8",
        ink: "#e7ecf5",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(124,92,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,255,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(0,229,255,0.15), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,229,255,0.25)",
        "glow-violet": "0 0 20px rgba(124,92,255,0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
