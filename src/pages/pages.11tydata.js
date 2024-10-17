export default {
	layout: 'layouts/page.njk',
	tags: ['pages'],
	permalink: function ({title}) {
		return `${this.slugify(title)}.html`;
	},
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
		},
	},
};
