export default {
	layout: 'layouts/post.njk',
	tags: ['post'],
	permalink: function ({title}) {
		return `${this.slugify(title)}.html`;
	},
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
		},
	},
	templateOverride: 'njk,md',
};
