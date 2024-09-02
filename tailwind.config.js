/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "#C5705D",
        secondary: "#D0B8A8",
        tertiary: "#DFD3C3",
        quaternary: "#F8EDE3",
      },
    },
  },
};
