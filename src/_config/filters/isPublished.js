// https://chrisburnell.com/article/some-eleventy-filters/#published

export const isPublished = (item) => {
	if ('data' in item) {
		// Check for 'draft: true' in the post's frontmatter and exit if found.
		if ('draft' in item.data && item.data.draft === true) {
			return false;
		}
		// Check for 'published: false' in the post's frontmatter and exit if found.
		if ('published' in item.data && item.data.published === false) {
			return false;
		}
		// Check if the post has the tag 'ignore' and exit if so.
		if ('tags' in item.data && item.data.tags.includes('ignore')) {
			return false;
		}
		// Check if post's date is in the future and exit if so.
		if ('date' in item.data && epoch(item.data.date) > nowEpoch) {
			return false;
		}
	}
	return !!item.url;
};
