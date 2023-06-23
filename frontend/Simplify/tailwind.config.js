/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        lato: ["lato", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
        right: ["Righteous", "cursive"],
      },
      colors: {
        darkGray: "rgb(195,195,195)",
        blue: "rgb(0, 0, 255)",
        neonBlue: "rgb(31, 81, 255)",
        navyBlue: "rgb(0, 0, 128)",
      },
    },
  },
  plugins: [],
};
