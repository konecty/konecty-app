import { postRed as post } from '../api';

const updateContact = async payload => {
	try {
		const { data } = await post('/app/select-healthUnit', payload);

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default updateContact;
