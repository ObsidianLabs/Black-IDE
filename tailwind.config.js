/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './src.main/**/*.{js,jsx}',
    '../electron-components/packages/**/index.es.js',
    '../eth-components/packages/**/index.es.js',
    '../bsc-components/packages/**/index.es.js',
  ],
  theme: {
    extend: {
      backgroundColor: {
        jumbotron: '#e9ecef',
      },
      borderRadius: {
        1.2: '0.3rem',
      },
    },
  },
  plugins: [],
};
