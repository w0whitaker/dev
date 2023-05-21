/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./_site/**/*.html"],
  presets: [require("./src/assets/design-tokens/typography.js")],
  theme: {
    fontFamily: {
      sans: ["Fredoka One", "sans-serif"],
      serif: ["Cormorant Garamond", "serif"],
      mono: ["Fira Code", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
