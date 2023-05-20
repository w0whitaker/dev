// const markdownIt = require('markdown-it');
const Image = require("@11ty/eleventy-img");
const path = require("path");
const classNames = require("classnames");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const footnotes = require("eleventy-plugin-footnotes");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");

// module import shortcodes

const { snippet, image } = require("./config/shortcodes/index.js");

require("dotenv").config();

// https://github.com/11ty/eleventy/issues/981#issuecomment-593397677
function sortByNumber(a, b) {
  return Number(a.data.order) - Number(b.data.order);
}

module.exports = function (eleventyConfig) {
  // Load environment variables
  eleventyConfig.addGlobalData("env", process.env);

  // Copy `src/assets/css/main.css` to `_site/assets/css/main.css`
  eleventyConfig.addPassthroughCopy("src/assets/css/main.css");
  eleventyConfig.addPassthroughCopy({ "src/fonts/**.*": "css/fonts" });

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(footnotes);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Custom collections
  eleventyConfig.addCollection("pages", function (collection) {
    const pages = collection
      .getFilteredByGlob("src/pages/*.njk")
      .sort(sortByNumber);
    return pages;
  });

  eleventyConfig.addCollection("projects", function (collection) {
    const projects = collection.getFilteredByTag("projects").sort(sortByNumber);
    return projects;
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->",
  });

  // Parse Markdown properly in excerpts
  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  });

  eleventyConfig.addFilter("isoDate", function (value) {
    return value.toISOString();
  });

  eleventyConfig.addFilter("humanDate", function (value) {
    let options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    let date = new Intl.DateTimeFormat("en-US", options).format(value);
    return date;
  });

  // Image shortcode https://www.aleksandrhovhannisyan.com/blog/eleventy-image-lazy-loading/
  eleventyConfig.addNunjucksAsyncShortcode("image", image);

  eleventyConfig.addPairedShortcode("snippet", function (content) {
    return snippet(content);
  });

  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("project", "project.njk");

  // Set custom directories for input, output, includes, and data
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
      output: "_site",
    },
  };
};
