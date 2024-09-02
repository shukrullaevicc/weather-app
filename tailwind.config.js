/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light" : "url('/images/Light.jpg')",
        "night" : "url('/images/Night.jpeg')",
        "pressure" : "url('/images/pressure.jpg')",
        "compass" : "url('/images/compass.png')",
        "arrow" : "url('/images/arrow.png')",
        "linear-color" : "linear-gradient(180deg, rgba(171,0,255,1) 0%, rgba(172,85,183,1) 66%, rgba(209,0,204,1) 100%);"
      },
      bgSize:{
        "full" : "100%",
      }
    },
  },
  plugins: [],
}