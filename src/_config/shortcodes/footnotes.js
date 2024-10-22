/**
 * Returns HTML for basic footnotes as a paired shortcode.
 *
 * @param {string} ftntTitle Provides the id for the rendered footnote.
 * @param {number} ftntRef The displayed identifier of the footnote.
 */

import {outdent} from 'outdent';

const ftntAnchor = (ftntTitle, ftntRef) => {
	return `<sup class="footnote-ref"><a href="#${ftntTitle}" id="fnref-${ftntTitle}">${ftntRef}</a></sup>`;
};

const ftntBacklink = (ftntTitle) => {
	return `<a href="#fnref-${ftntTitle}" class="footnote-backlink">back</a>`;
};

const ftntContent = (content, ftntTitle) => {
	return outdent`
<div id="${ftntTitle}">

${content}

</div>
`;
};

export {ftntAnchor, ftntBacklink, ftntContent};
