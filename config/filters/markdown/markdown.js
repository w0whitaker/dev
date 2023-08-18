const markdownIt = require("markdown-it");

const md = (content = "") => {
  return markdownIt({ html: true }).render(content);
};

module.exports = md;
