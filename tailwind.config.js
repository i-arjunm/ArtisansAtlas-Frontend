/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C7362',    // Dusty Teal
        secondary: '#F3ECE7',  // Warm Linen
        accent: {
          coral: '#E6A4A4',    // Soft Coral
          indigo: '#6C7A89',   // Muted Indigo
        },
        sand: '#EDE6DB',       // Pale Sand
        text: {
          primary: '#2C2C2C',  // Graphite Black
          muted: '#777C7F',    // Slate Gray
        },
        cta: '#D98162',        // Sunset Terracotta
      },
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}