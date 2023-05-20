const sortByNumber = require("../../helpers/index.js");

const getAllProjects = (collection) => {
  const projects = collection.getFilteredByTag("projects").sort(sortByNumber);
  return projects;
};

module.exports = getAllProjects;
