/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.tsx',
    './src/layouts/**/*.tsx',
    './node_modules/@holaplex/ui-library-react/dist/index.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3F36D',
        secondary: '#1A1A1D',
        maintext: '#FFFFFF',
        subtletext: '#AAAAAA',
        mainbg: '#1A1A1D',
        subtlebg: '#212122',
        activecell: '#2B2B2B',
        divider: '#2B2B2B',
        container: '#212122',
        positive: '#479E5A',
        negative: '#E52E2E',
        warning: '#F0B41A',
        gray: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#c5c5c5',
          400: '#AAAAAA',
          500: '#7b7b7b',
          600: '#555555',
          800: '#292929',
        },
        red: {
          100: '#FCEAEA',
          900: '#D61717',
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
