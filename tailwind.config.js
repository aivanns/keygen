/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#081c15',
        'color-2': '#1b4332',
        'color-3': '#2d6a4f',
        'color-4': '#40916c',
        'color-5': '#52b788',
      },
    },
  },
  plugins: [],
}