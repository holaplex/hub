/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        positive: '#479E5A',
        negative: '#E62E2E',
        warning: '#F0B41A',
        gray: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#с5с5с5',
          500: '#7b7b7b',
          600: '#555555',
          800: '#292929',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
