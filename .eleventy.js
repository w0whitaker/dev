module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats([
		'njk',
		'md',
		'css'
	]);
  // Set custom directories for input, output, includes, and data
  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    },
  };
};
