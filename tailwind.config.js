/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        heading: "'Aladin', system-ui",
        secondary:"'Pompiere', sans-serif",
        },
        colors: {
          menu:"#262626",
          orange:"#EFAE07",
        },
        backgroundImage:{
          hero:"url('/hero.png')",
          },
    },
  },
  plugins: [],
}