/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,mdx,njk,twig,vue}'],
  presets: [
    require('./src/assets/design-tokens/typography.js'),
    require('./src/assets/design-tokens/spacing.js'),
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
