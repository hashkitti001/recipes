/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        100: "#34b903", /*light green */
        200: "#cd0e02", /*tomato red */
        300: "#000000", /*black af */
        400: "#FFFECB" 
      }
    },
  },
  plugins: [],
}

