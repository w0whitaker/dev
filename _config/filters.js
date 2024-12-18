import { DateTime } from "luxon";
import { epoch, nowEpoch } from "./helpers/epoch.js";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLLL yyyy"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", (target) => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("isPublished", function isPublished(item) {
		if ("data" in item) {
			// Check for 'draft: true' in the post's frontmatter and exit if found.
			if ("draft" in item.data && item.data.draft === true) {
				return false;
			}
			// Check for 'published: false' in the post's frontmatter and exit if found.
			if ("published" in item.data && item.data.published === false) {
				return false;
			}
			// Check if the post has the tag 'ignore' and exit if so.
			if ("tags" in item.data && item.data.tags.includes("ignore")) {
				return false;
			}
			// Check if post's date is in the future and exit if so.
			if ("date" in item.data && epoch(item.data.date) > nowEpoch) {
				return false;
			}
		}
		return !!item.url;
	});
}
