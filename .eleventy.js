/** @format */

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssClean = require('postcss-clean');

const snippet = require('./src/js/shortcodes.js');
// const imagety = require('@11ty/eleventy-img');
// const path = require('path');
// const classNames = require('classnames');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const footnotes = require('eleventy-plugin-footnotes');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');

require('dotenv').config();

// https://github.com/11ty/eleventy/issues/981#issuecomment-593397677
function sortByNumber(a, b) {
    return Number(a.data.order) - Number(b.data.order);
}

module.exports = function (eleventyConfig) {
    // Load environment variables
    eleventyConfig.addGlobalData('env', process.env);

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(footnotes);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Custom collections
    eleventyConfig.addCollection('pages', function (collection) {
        const pages = collection
            .getFilteredByGlob('src/pages/*.njk')
            .sort(sortByNumber);
        return pages;
    });

    eleventyConfig.addCollection('projects', function (collection) {
        const projects = collection
            .getFilteredByTag('projects')
            .sort(sortByNumber);
        return projects;
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '<!-- more -->',
    });

    // Parse Markdown properly in excerpts
    eleventyConfig.addFilter('md', function (content = '') {
        return markdownIt({ html: true }).render(content);
    });

    eleventyConfig.addFilter('isoDate', function (value) {
        return value.toISOString();
    });

    eleventyConfig.addFilter('humanDate', function (value) {
        let options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };
        let date = new Intl.DateTimeFormat('en-US', options).format(value);
        return date;
    });

    eleventyConfig.addPairedShortcode('snippet', function (content) {
        return snippet(content);
    });

    eleventyConfig.addTemplateFormats('css');
    eleventyConfig.addExtension('css', {
        outputFileExtension: 'css',
        compile: async (content, path) => {
            if (path !== './src/assets/css/style.css') {
                return;
            }

            return async () => {
                let output = await postcss([
                    postcssImport,
                    postcssClean,
                ]).process(content, {
                    from: path,
                });

                return output.css;
            };
        },
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
