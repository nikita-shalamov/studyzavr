import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css, scss, sass}",
    "./src/components/**/*.{css, scss, sass}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2447F9",
        secondary: "#FC7A46",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["SF Pro Text", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
