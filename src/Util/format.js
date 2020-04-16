/* eslint-disable import/prefer-default-export */

export function formatDate(isoString) {
	const prefix0 = s => (String(s).length === 1 ? `0${s}` : s);
	const date = new Date(isoString);

	if (date.toString() === 'Invalid Date') return isoString;

	return [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(prefix0).join('/');
}
