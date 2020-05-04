/* eslint-disable import/prefer-default-export */

export function normalizeSymptoms(string) {
	if (!string || !String(string).length) return null;

	return string.replace(/\s?\(.*?\)\s?/gi, '').replace(/,,/g, ',');
}
