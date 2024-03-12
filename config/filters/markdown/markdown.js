const markdownIt = require("markdown-it");

const md = (content = "") => {
  return markdownIt({ 
    html: true,
    typographer: true
  }).render(content);
};

module.exports = md;
