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
        'badge-primary': '#007bff',
        'badge-secondary': '#6c757d',
        'badge-success': '#28a745',
        'badge-info': '#17a2b8',
        'badge-warning': '#ffc107',
        'badge-danger': '#dc3545',
        'badge-light': '#f8f9fa',
        'badge-dark': '#343a40',
      },
      colors: {
        'badge-primary': '#fff',
        'badge-secondary': '#fff',
        'badge-success': '#fff',
        'badge-info': '#fff',
        'badge-warning': '#212529',
        'badge-danger': '#fff',
        'badge-light': '#212529',
        'badge-dark': '#fff',
      },
      borderRadius: {
        1.2: '0.3rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
