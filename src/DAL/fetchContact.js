import { getRed as get } from './api';

const getContact = async code => {
	try {
		const { data } = await get(`fetchContact?code=${code}`);

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getContact;
