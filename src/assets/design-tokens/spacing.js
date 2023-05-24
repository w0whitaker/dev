/**
 * @format
 * @link https://utopia.fyi/space/calculator?c=320,16,1.333,1116,18,1.5,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
 */

module.exports = {
  theme: {
    extend: {
      spacing: {
        '3xs': 'clamp(0.25rem, calc(0.22rem + 0.13vw), 0.31rem)',
        '2xs': 'clamp(0.50rem, calc(0.47rem + 0.13vw), 0.56rem)',
        xs: 'clamp(0.75rem, calc(0.70rem + 0.25vw), 0.88rem)',
        s: 'clamp(1.00rem, calc(0.95rem + 0.25vw), 1.13rem)',
        m: 'clamp(1.50rem, calc(1.42rem + 0.38vw), 1.69rem)',
        l: 'clamp(2.00rem, calc(1.90rem + 0.50vw), 2.25rem)',
        xl: 'clamp(3.00rem, calc(2.85rem + 0.75vw), 3.38rem)',
        '2xl': 'clamp(4.00rem, calc(3.80rem + 1.01vw), 4.50rem)',
        '3xl': 'clamp(6.00rem, calc(5.70rem + 1.51vw), 6.75rem)',
      },
    },
  },
};
