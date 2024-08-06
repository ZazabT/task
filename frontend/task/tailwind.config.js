/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'brutalism': "url('/src/assets/bruthalism.webp')",
      },
    },
  },
  plugins: [],
}

