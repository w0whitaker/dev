// https://github.com/11ty/eleventy/issues/981#issuecomment-593397677

const sortByNumber = (a, b) => {
    return Number(a.data.order) - Number(b.data.order);
  };
  
  module.exports = sortByNumber;
  