// https://css-irl.info/a-versatile-markdown-shortcode-for-eleventy/

export const htmlement = (content, el = 'aside', className) => {
	return `<${el} class="${className}">${content}</${el}>`;
};
