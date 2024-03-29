/** @format */

// Requires
const Image = require('@11ty/eleventy-img');
const outdent = require('outdent');
const stringifyAttributes = require('./stringify-attributes.js');

// Image shortcode https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/

// 'image' is a function, and 'src', 'alt', etc. are its arguments
const image = async (
	src,
	alt,
	className = undefined,
	widths = [400, 800, 1280],
	// images will be generated in these formats - in order listed
	formats = ['webp', 'jpeg'],
	// need to understand this better
	sizes = '100vw'
) => {
	const imageMetadata = await Image(src, {
		widths: [...widths, null],
		formats: [...formats, null],
		outputDir: '_site/images',
		urlPath: '/images/',
		// set custom hash format here eventually
	});

	const sourceHtmlString = Object.values(imageMetadata)
		// Map each format to the source HTML markup
		.map((images) => {
			// The first image's sourceType is the same as those of all other images
			// belonging to this format (e.g., image/webp).
			const { sourceType } = images[0];

			// Use our util from earlier to make our lives easier
			const sourceAttributes = stringifyAttributes({
				type: sourceType,
				// srcset needs to be a comma-separated attribute
				srcset: images
					.map((image) => image.srcset.replace('/images', 'images'))
					.join(', '),
				sizes,
			});

			// Return one <source> per format
			return `<source ${sourceAttributes}>`;
		})
		.join('\n');

	const getLargestImage = (format) => {
		const images = imageMetadata[format];
		return images[images.length - 1];
	};

	const largestUnoptimizedImg = getLargestImage(formats[1]);

	const imgAttributes = stringifyAttributes({
		src: largestUnoptimizedImg.url.replace('/images', 'images'),
		width: largestUnoptimizedImg.width,
		height: largestUnoptimizedImg.height,
		alt,
		loading: 'lazy',
		decoding: 'async',
	});

	const imgHtmlString = `<img ${imgAttributes}>`;

	const pictureAttributes = stringifyAttributes({
		class: className,
	});

	const picture = `<picture ${pictureAttributes}>
    ${sourceHtmlString}
    ${imgHtmlString}
  </picture>`;

	return outdent`${picture}`;
};

module.exports = image;
