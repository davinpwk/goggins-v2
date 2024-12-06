import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#112D4E",
      "background-light": "rgba(235, 234, 255, 0.2)",
    },
    backgroundImage: {
      gradient: "linear-gradient(to bottom, #F8FFAE, #43C6AC)",
      light: "#FDF7F4",
    },
    fontFamily: {
      "roboto-mono": ["var(--font-roboto-mono)"],
      "sansita-swashed": ["var(--font-sansita-swashed)"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
