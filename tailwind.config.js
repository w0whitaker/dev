/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./_site/**/*.html"],
  presets: [require("./src/assets/design-tokens/typography.js")],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka One"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
