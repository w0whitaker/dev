const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let url =
		"https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development";
	let token = process.env.RAINDROP_TOKEN;
	try {
		let json = await EleventyFetch(url, {
			duration: "1d",
			type: "json",
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		let links = json.items.map((elem) => {
			return {
				title: elem.title,
				url: elem.link,
				excerpt: elem.excerpt,
				cover: elem.cover,
			};
		});

		return links;
	} catch (e) {
		console.error(e);
		return {
			links: 0,
		};
	}
};
