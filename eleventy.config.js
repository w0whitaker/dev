/** @format */

const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const eleventyWebcPlugin = require('@11ty/eleventy-plugin-webc');
const { eleventyImagePlugin } = require('@11ty/eleventy-img');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const footnotes = require('eleventy-plugin-footnotes');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

// module import collections
const {
  getAllProjects,
  getAllPages,
} = require('./config/collections/index.js');
// module import shortcodes
const { snippet } = require('./config/shortcodes/index.js');
// module import filters
const { isoDate, humanDate, md } = require('./config/filters/index.js');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  // Load environment variables
  // eleventyConfig.addGlobalData('env', process.env);

  eleventyConfig.addPassthroughCopy('./src/assets');

  // Plugins
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(footnotes);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: ['npm:@11ty/eleventy-img/*.webc'],
  });
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ['webp', 'jpeg'],
    urlPath: '/images/',
    outputDir: './_site/images/',
    width: [270, 830, 1150, 1390, 1760, 1910, 2048],
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  });

  // Custom collections
  eleventyConfig.addCollection('pages', getAllPages);
  eleventyConfig.addCollection('projects', getAllProjects);

  // Custom filters
  eleventyConfig.addFilter('md', md);
  eleventyConfig.addFilter('isoDate', isoDate);
  eleventyConfig.addFilter('humanDate', humanDate);

  // Custom shortcodes
  //eleventyConfig.addNunjucksAsyncShortcode('image', image);
  eleventyConfig.addPairedShortcode('snippet', snippet);

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('project', 'project.njk');

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- more -->',
  });

  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      data: '_data',
      input: 'src',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: '_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: ['njk', 'webc'],
  };
};
