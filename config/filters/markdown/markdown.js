const markdownIt = require("markdown-it");

const md = (content = "") => {
	return markdownIt({
		html: true,
		typographer: false,
		breaks: false,
	}).render(content);
};

module.exports = md;
