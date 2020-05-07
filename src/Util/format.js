/* eslint-disable import/prefer-default-export */

export function normalizeSymptoms(string) {
	if (!string || !String(string).length) return null;

	return string.replace(/\s?\(.*?\)\s?/gi, '').replace(/,,/g, ',');
}

export function formatPhone(number) {
	if (!number || !String(number).length) {
		return number;
	}

	const phone = String(number).replace(/\D/g, '');
	if (phone.length === 8) {
		if (phone.startsWith('3')) {
			return phone.replace(/(\d{4})(\d{4})/, '$1-$2');
		}
		return phone.replace(/(\d{4})(\d{4})/, '9$1-$2');
	}
	if (phone.length === 9) {
		return phone.replace(/(\d{5})(\d{4})/, '$1-$2');
	}
	if (phone.length === 10) {
		if (phone['2'] == 3) {
			return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
		}
		return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) 9$2-$3');
	}
	if (phone.length === 11) {
		return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	}

	return phone;
}
