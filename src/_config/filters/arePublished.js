// https://chrisburnell.com/article/some-eleventy-filters/#published

export const arePublished = (array) => {
	return array.filter(isPublished);
};
