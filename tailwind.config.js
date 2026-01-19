/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B2A41', // El color oscuro del logo
          orange: '#E89B25', // El color de la cinta
          light: '#F3F4F6', // Fondo suave
        }
      },
    },
  },
  plugins: [],
}

