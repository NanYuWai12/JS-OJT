const { default: plugin } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./todo/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
