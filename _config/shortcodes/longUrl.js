/**
 * Add <wbr> to long urls
 * https://gitlab.com/reubenlillie/reubenlillie.com/-/blob/main/_includes/filters/format-url.js
 * @param {string} url A raw URL to format
 * @return {string} A formatted URL
 */
export function longUrl(url) {
	const doubleSlash = url.split("//");
	const formatted = doubleSlash
		.map((str) =>
			str
				.replace(/(?<colon>:)/giu, "$1<wbr>")
				.replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
				.replace(/(?<both>[=&])/giu, "<wbr>$1<wbr>")
		)
		.join("//<wbr>");

	return `<a href="${url}">${formatted}</a>`;
}
