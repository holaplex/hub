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
        primary: '#000000',
        positive: '#479E5A',
        warning: '#F0B41A',
        stone: {
          // cell subtle
          800: '#2B2B2B',
          // bg subtle
          900: '#212122',
          // bg
          950: '#1A1A1D',
        },
        yellow: {
          // cta
          300: '#F3F36D',
          // caution
          400: '#F3AF00',
          // cta hover
          500: '#ADAD4C',
        },
        gray: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#F6F8FA',
          // text subtle
          400: '#AAAAAA',
          500: '#7b7b7b',
          600: '#555555',
          800: '#292929',
        },
        red: {
          100: '#FCEAEA',
          // danger
          500: '#E4584F',
          900: '#D61717',
        },
        blue: {
          // info
          400: '#0061F3',
        },
        green: {
          200: '#C7F4D1',
          // success
          400: '#628E36',
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
