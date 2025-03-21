/**
 * Add <wbr> to long urls
 *
 * @param {string} url A raw URL to format
 * @return {string} A formatted URL
 */

// export default (url) => {

// 	const formatted = doubleSlash
// 		.map((str) =>
// 			str
// 				.replace(/(?<colon>:)/giu, "$1<wbr>")
// 				.replace(/?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
// 				.replace(/?<both>[=&])/giu, "<wbr>$1<wbr>")
// 		)
// 		.join("//<wbr>");

// 	return formatted;
// };
//

export function longUrl(url) {
	const doubleSlash = url.split("//");
	console.log(doubleSlash);
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
