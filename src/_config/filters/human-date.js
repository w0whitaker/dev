export const humanDate = (value) => {
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	};
	let date;
	date = new Intl.DateTimeFormat('en-US', options).format(value);
	return date;
};
