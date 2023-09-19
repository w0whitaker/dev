/** @format */

const imagety = require('@11ty/eleventy-img');
const footnotes = require('eleventy-plugin-footnotes');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

require('dotenv').config();

// module import collections
const {
    getAllProjects,
    getAllPages,
} = require('./config/collections/index.js');

// module import filters
const { isoDate, humanDate, md } = require('./config/filters/index.js');

// module import shortcodes
const { image, snippet } = require('./config/shortcodes/index.js');

module.exports = function (eleventyConfig) {
    // Load environment variables
    eleventyConfig.addGlobalData('env', process.env);

    // Plugins
    eleventyConfig.addPlugin(footnotes);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Custom collections
    eleventyConfig.addCollection('pages', getAllPages);
    eleventyConfig.addCollection('projects', getAllProjects);

    // Custom filters
    eleventyConfig.addFilter('md', md);
    eleventyConfig.addFilter('isoDate', isoDate);
    eleventyConfig.addFilter('humanDate', humanDate);

    // Custom shortcodes
    eleventyConfig.addNunjucksAsyncShortcode('image', image);
    eleventyConfig.addPairedShortcode('snippet', snippet);

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '<!-- more -->',
    });
    // Set custom directories for input, output, includes, and data
    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data',
            output: '_site',
        },
    };
};
