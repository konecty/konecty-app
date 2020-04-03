/* eslint-disable import/prefer-default-export */

async function getKeyFromString(key) {
	return crypto.subtle.importKey('jwk', key, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}
function str2ab(str) {
	const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	const bufView = new Uint16Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

export async function decrypt(data, key) {
	const cryptoKey = await getKeyFromString(key);
	const binaryData = atob(decodeURIComponent(data));
	const vector = new Uint8Array(new Uint16Array(str2ab(binaryData.slice(0, 16))));
	const buffer = new Uint8Array(new Uint16Array(str2ab(binaryData.slice(16))));
	const decoded = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: vector }, cryptoKey, buffer);
	return new TextDecoder('UTF-8').decode(decoded);
}
