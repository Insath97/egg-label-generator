/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#a1887f",
          600: "#8d6e63",
          700: "#795548",
          800: "#5d4037",
          900: "#4e342e",
        },
        cream: "#FFF8E1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
