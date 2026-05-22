/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F3460',
        success: '#16A34A',
        warning: '#EA580C',
        danger: '#DC2626',
      }
    },
  },
  plugins: [],
}