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
        negative: '#E52E2E',
        warning: '#F0B41A',
        gray: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#с5с5с5',
          500: '#7b7b7b',
          600: '#555555',
          800: '#292929',
        },
        green: {
          200: '#C7F4D1',
          400: '#A5DBB1',
          600: '#194D19',
        },
        brown: {
          200: '#F3D7B3',
          400: '#D7B384',
          600: '#4B4134',
        },
        cyan: {
          200: '#CBE3FA',
          400: '#9EBFDF',
          600: '#334D66',
        },
        pink: {
          200: '#F5D6F5',
          400: '#CF99D4',
          600: '#533953',
        },
        purple: {
          200: '#E6DCFA',
          400: '#A18FD4',
          600: '#5336A5',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
