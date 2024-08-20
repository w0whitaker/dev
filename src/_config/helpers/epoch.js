/**
 * @param {string} dateString
 * @returns {string}
 */

// https://github.com/chrisburnell/chrisburnell.com/blob/0304e5cd2011067a2505251e4a2433c1be95c161/src/eleventy/filters/dates.js#L102

export const epoch = (dateString) => {
	return new Date(dateString).getTime();
};

export const nowEpoch = Date.now();
