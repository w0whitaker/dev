const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const footnotes = require('eleventy-plugin-footnotes');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');

require('dotenv').config();

// module import filters
const {
	isoDate,
	humanDate,
	md,
	cssmin
} = require('./config/filters/index.js');

// module import shortcodes
const {
	image,
	snippet
} = require('./config/shortcodes/index.js');

module.exports = function (eleventyConfig) {
	// Load environment variables
	eleventyConfig.addGlobalData('env', process.env);

	// Passthrough copy
	eleventyConfig.addPassthroughCopy('src/css/**/*.css');
	eleventyConfig.addPassthroughCopy('src/assets/images/**/*');
	eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

	// Plugins
	eleventyConfig.addPlugin(footnotes);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Custom collections
	// eleventyConfig.addCollection('pages', getAllPages);
	// eleventyConfig.addCollection('projects', getAllProjects);

	// Custom filters
	eleventyConfig.addFilter('md', md);
	eleventyConfig.addFilter('isoDate', isoDate);
	eleventyConfig.addFilter('humanDate', humanDate);
	eleventyConfig.addFilter('cssmin', cssmin);

	// Custom shortcodes
	eleventyConfig.addNunjucksAsyncShortcode('image', image);
	eleventyConfig.addPairedShortcode('snippet', snippet);

	eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
	eleventyConfig.addLayoutAlias('project', 'layouts/project.njk');

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- more -->',
	});

	// Watch targets
	eleventyConfig.addWatchTarget('./src/assets/**/*.css');

	// Set custom directories for input, output, includes, and data
	return {
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			includes: '_includes',
			data: '_data',
			output: '_site',
		},
	};
};
