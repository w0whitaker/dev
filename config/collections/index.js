/** Returns all project descriptions as a collection **/
const sortByNumber = require("./utils");

const getAllProjects = (collection) => {
  const projects = collection.getFilteredByTag("projects").sort(sortByNumber);
  return `projects: ${projects}`;
};

module.exports = {
  getAllProjects,
};
