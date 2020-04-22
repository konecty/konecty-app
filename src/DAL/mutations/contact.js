import { putRed as put } from '../api';

const updateContact = async (contacts, payload) => {
	try {
		const ids = contacts.map(({ _id }) => _id);
		const { data } = await put('/app/save-contact', { ids, data: payload });

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default updateContact;
