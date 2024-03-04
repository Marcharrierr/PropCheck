/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-primary-propcheck": "#172E5E",
        "blue-nav": "#102E6E",
        "blue-text": "#2455BE",
        "blue-footer": "#1D2B49",
        "blue-tittle": "#102E6F",

      },
      maxWidth: {
        'cardList': '1500px',
      },
      minWidth: {
        'lg': '50px',
        '350px': '335px',
        '400px': '435px',
        '320px': '290px',
        '800px': '890px',
        'search': '920px',
        'cardList': '1500px',
        'icon': '45px',
      },
      minHeight: {
        'lg': '220px',
        'lg-500': '200px',
        'icon': '15px',
      },
      screens: {
        'sm': '640px', // pantalla pequeña
        'md': '768px', // pantalla mediana
        'lg': '1024px', // pantalla grande
        'xl': '1280px', // pantalla extra grande
      },
      display: {
        'none-sm': 'none', // Oculta en pantallas pequeñas
        'block-md': 'block', // Muestra en pantallas medianas
      },
      borderRadius: {
        'large': '40px', // Redondeo de 30px
      },

    },
  },
  plugins: [],
}
