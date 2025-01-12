/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5e503f",
        secondary: "#c6ac8f"
      }
    }
  },
  plugins: []
};
