/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // usa la preferencia del sistema para modo oscuro
  theme: {
    extend: {
      colors: {
        darkBg: '#242424',
        darkText: 'rgba(255, 255, 255, 0.87)',
        linkBlue: '#646cff',
        linkBlueHover: '#535bf2',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
