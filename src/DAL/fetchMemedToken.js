import { getRed } from './api';

const fetchToken = async uid => {
	try {
		const { data } = await getRed(`/memed/getToken?uid=${uid}`);
		if (data.success) return data.token;

		throw data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default fetchToken;
