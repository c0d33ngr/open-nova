/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors:{
        primary:"#5234CA",
        secondary:"#00DAD9",
        dark : "#0B1111",
        darkAccent : "#222222",
        // white: '#fff',
        // whiteAccent:"rgba(255, 255, 255, 0.61)",
      }
    },
  },
  plugins: [],
}
