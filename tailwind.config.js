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
        "Property-debt": "#762222"
      },
      maxWidth: {
        'cardList': '1000px',
        'maxcards': '1300px',
      },
      minWidth: {
        'lg': '50px',
        '350px': '250px',
        '400px': '435px',
        '320px': '290px',
        '800px': '890px',
        'search': '10px',
        'cardList': '800px',
        'icon': '30px',
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
