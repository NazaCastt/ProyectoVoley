/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'voley-red-dark': '#73020C',
        'voley-blue-dark': '#020F59',
        'voley-blue-medium': '#03258C',
        'voley-blue-vibrant': '#044BD9',
        'voley-red-bright': '#F20505',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}