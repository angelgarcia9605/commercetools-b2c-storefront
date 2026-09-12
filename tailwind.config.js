/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#6366F1',
        accent: '#EC4899',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
