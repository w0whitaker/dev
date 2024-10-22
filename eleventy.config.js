import 'dotenv/config'; // allows for use of .env file
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import pluginRss from '@11ty/eleventy-plugin-rss';

// Import filters.
import {
	isoDate,
	humanDate,
	md,
	isPublished,
	arePublished,
} from './src/_config/filters/index.js';

// Import shortcodes.
import {htmlement} from './src/_config/shortcodes/htmlement.js';
import {
	ftntAnchor,
	ftntBacklink,
	ftntContent,
} from './src/_config/shortcodes/footnotes.js';

export default function (eleventyConfig) {
	// Load environment variables
	eleventyConfig.addGlobalData('env', process.env);

	// Passthrough copy
	eleventyConfig.addPassthroughCopy('src/css/**/*.css');
	eleventyConfig.addPassthroughCopy('src/assets/images/**/*');
	eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

	// Plugins
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginRss);

	// Custom filters
	eleventyConfig.addFilter('md', md);
	eleventyConfig.addFilter('isoDate', isoDate);
	eleventyConfig.addFilter('humanDate', humanDate);
	eleventyConfig.addFilter('isPublished', isPublished);
	eleventyConfig.addFilter('arePublished', arePublished);

	// Custom shortcodes
	eleventyConfig.addPairedShortcode('htmlement', htmlement);
	eleventyConfig.addShortcode('ftntAnchor', ftntAnchor);
	eleventyConfig.addPairedShortcode('ftntContent', ftntContent);
	eleventyConfig.addShortcode('ftntBacklink', ftntBacklink);

	eleventyConfig.setTemplateFormats(['html', 'md', 'njk', '11ty.js']);

	// Collections
	eleventyConfig.addCollection('posts', function (collectionApi) {
		return collectionApi.getFilteredByTags('post');
	});

	// Layouts
	eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- more -->',
	});

	// Watch targets
	eleventyConfig.addWatchTarget('./src/assets/**/*.css');
	eleventyConfig.addWatchTarget('./src/posts/**/*.md');

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
}
