const markdownIt = require("markdown-it");

const md = (content = "") => {
  return markdownIt({ 
    html: true,
    typographer: false,
		breaks: true
  }).render(content);
};

module.exports = md;
