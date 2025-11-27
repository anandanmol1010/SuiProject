/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#14b8a6',
        dark: '#0f172a',
        'dark-light': '#1e293b',
      },
      backgroundColor: {
        card: 'rgba(15, 23, 42, 0.8)',
        'card-hover': 'rgba(30, 41, 59, 0.8)',
      },
      borderColor: {
        'glass': 'rgba(148, 163, 184, 0.2)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
