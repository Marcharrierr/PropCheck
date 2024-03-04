/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts, js}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-primary-propcheck": "#172E5E",
        "blue-nav": "#102E6E",
        "blue-footer": "#1D2B49",
        "blue-tittle": "#102E6F",
      }
    },
  },
  plugins: [],
}

