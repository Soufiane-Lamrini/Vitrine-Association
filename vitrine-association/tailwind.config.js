/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Analyse tous les fichiers React
  ],
  theme: {
    extend: {}, // Personnalisations optionnelles
  },
  plugins: [], // Plugins Tailwind optionnels
};