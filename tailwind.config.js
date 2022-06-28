const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './node_modules/@obsidians/*/dist/index.es.js',
    './src/**/*.js',
    './src.main/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('not-disabled', '&:not(:disabled)');
    }),
  ],
};
