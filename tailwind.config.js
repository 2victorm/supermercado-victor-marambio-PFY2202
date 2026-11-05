/** @type {import('tailwindcss').Config} */
module.exports = {
  // "content" hace que en producción solo se incluyan las clases realmente usadas (purga)
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      // Paleta del diseño de la semana 1
      colors: {
        brand: {
          primary: '#0b6fd6', // azul
          secondary: '#0a4f9e', // azul oscuro
          accent: '#ffc220', // amarillo
          light: '#e6f0fb', // azul claro (encabezado de tabla, etiquetas)
          bg: '#f2f4f7', // gris de fondo
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
