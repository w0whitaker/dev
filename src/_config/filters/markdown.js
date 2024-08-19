import markdownIt from 'markdown-it';

export const md = (content = '') => {
	return markdownIt({
		html: true,
		typographer: false,
		breaks: false,
	}).render(content);
};
