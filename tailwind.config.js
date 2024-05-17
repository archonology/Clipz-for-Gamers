/** @type {import('tailwindcss').Config} */
// a safe list is added so we can dynamically change the tailwind. Tailwind will ignore the dynamic color changes by default.
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

