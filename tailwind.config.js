/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity:["disabled"],
      cursor: ["disabled"]
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      // logo: ['Rampart One', "cursive"]
      logo: ['Germania One', 'cursive']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
