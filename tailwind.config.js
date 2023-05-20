/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{njk,md}", "./_site/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
