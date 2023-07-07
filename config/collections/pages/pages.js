const sortByNumber = require("../../helpers/index.js");

const getAllPages = (collection) => {
  const pages = collection
    .getFilteredByGlob("src/pages/*.njk")
    .sort(sortByNumber);
  return pages;
};

module.exports = getAllPages;
