/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  safelist: [
    'focus:ring-[#e0692d]',
    'focus:border-[#e0692d]'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}