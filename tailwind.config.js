/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        dialog: "dialog 300ms ease-out 1",
      },
      keyframes: {
        dialog: {
          "0%": { transform: "translateY(2rem) scale(0.75)", opacity: "0" },
          "25%": { opacity: 0 },
          "75%": { transform: "scale(1.05)" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
};
