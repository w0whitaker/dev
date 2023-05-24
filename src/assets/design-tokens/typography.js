/**
 * @format
 * @link https://utopia.fyi/type/calculator?c=320,16,1.333,1116,18,1.5,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
 */

module.exports = {
  theme: {
    extend: {
      fontSize: {
        'step--2': 'clamp(0.50rem, calc(0.59rem + -0.13vw), 0.56rem)',
        'step--1': 'clamp(0.75rem, calc(0.75rem + 0.00vw), 0.75rem)',
        'step-0': 'clamp(1.00rem, calc(0.95rem + 0.25vw), 1.13rem)',
        'step-1': 'clamp(1.33rem, calc(1.19rem + 0.71vw), 1.69rem)',
        'step-2': 'clamp(1.78rem, calc(1.47rem + 1.52vw), 2.53rem)',
        'step-3': 'clamp(2.37rem, calc(1.79rem + 2.87vw), 3.80rem)',
        'step-4': 'clamp(3.16rem, calc(2.14rem + 5.10vw), 5.70rem)',
        'step-5': 'clamp(4.21rem, calc(2.47rem + 8.71vw), 8.54rem)',
      },
    },
  },
};
