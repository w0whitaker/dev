const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
	let url =
		'https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development';
	// @todo make this secret
	let token = '5f0ec43b-a884-4192-83d3-d5e267be54bc';
	try {
		let json = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});

		return {
			links: json.items,
		};
	} catch (e) {
		console.error('fetch failed, returning 0');
		return {
			links: 0,
		};
	}
};
