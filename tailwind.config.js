/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light" : "url('/images/light.jpg')",
        "pressure" : "url('/images/pressure.jpg')",
        "compass" : "url('/images/compass.png')",
        "arrow" : "url('/images/arrow.png')"
      },
      bgSize:{
        "full" : "100%",
      }
    },
  },
  plugins: [],
}