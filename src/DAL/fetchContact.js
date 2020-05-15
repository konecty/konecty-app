import { getRed as get } from './api';

const getContact = async ({ code, rid, uid }) => {
	try {
		const { data } = await get(`fetchContact?code=${code}&rid=${rid}&uid=${uid}`);

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getContact;
