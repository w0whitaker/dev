/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['./src/**/*.{html,js,jsx,mdx,njk,twig,vue}'],
  presets: [
    require('./src/assets/design-tokens/typography.js'),
    require('./src/assets/design-tokens/spacing.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
