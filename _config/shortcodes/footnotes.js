/**
 * Returns HTML for basic footnotes as a paired shortcode.
 *
 * @param {string} ftntTitle Provides the id for the rendered footnote.
 * @param {number} ftntRef The displayed identifier of the footnote.
 */

const ftntAnchor = (ftntTitle) => {
	return `<a href="#${ftntTitle}" id="fnref-${ftntTitle}">&rarrlp;</a>`;
};

const ftntBacklink = (ftntTitle) => {
	return `<a href="#fnref-${ftntTitle}" class="footnote-backlink">&larrlp;</a>`;
};

const ftntContent = (content, ftntTitle) => {
	return `
<div id="${ftntTitle}">

${content}

</div>
`;
};

export { ftntAnchor, ftntBacklink, ftntContent };
