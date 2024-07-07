/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#f1c40f',
        tertiary: '#e74c3c',
        quaternary: '#9b59b6',
        'white-50': 'rgba(255, 255, 255, 0.5)'
      },
      spacing: {
        '12': '3rem',
      },
    },
  },
  plugins: [],
}
