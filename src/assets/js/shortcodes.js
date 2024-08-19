/** @format */

const markdownIt = require('markdown-it');
const outdent = require('outdent');

const snippet = (content) => {
	return markdownIt({html: true}).render(
		outdent`<section class="flow">${content}</section>`,
	);
};

module.exports = snippet;
