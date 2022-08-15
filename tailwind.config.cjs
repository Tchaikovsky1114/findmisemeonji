/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s infinite'
      },
      keyframes: {
        shimmer : {
          '10%' : {
            "transform": "translateX(100%)"
          }
        }
      }
    },
  },
  plugins: [],
}
