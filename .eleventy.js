const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const footnotes = require("eleventy-plugin-footnotes");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

// module import filters
const { isoDate, humanDate, md } = require("./config/filters/index.js");

module.exports = function (eleventyConfig) {
	// Load environment variables
	eleventyConfig.addGlobalData("env", process.env);

	// Passthrough copy
	eleventyConfig.addPassthroughCopy("src/css/**/*.css");
	eleventyConfig.addPassthroughCopy("src/assets/images/**/*");
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// Plugins
	eleventyConfig.addPlugin(footnotes);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginRss);
	// Custom filters
	eleventyConfig.addFilter("md", md);
	eleventyConfig.addFilter("isoDate", isoDate);
	eleventyConfig.addFilter("humanDate", humanDate);

	eleventyConfig.setTemplateFormats(["html", "md", "njk"]);

	// Collections
	eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByTags("post", "published");
	});
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
	eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- more -->",
	});

	// Watch targets
	eleventyConfig.addWatchTarget("./src/assets/**/*.css");

	// Set custom directories for input, output, includes, and data
	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			includes: "_includes",
			data: "_data",
			output: "_site",
		},
	};
};
