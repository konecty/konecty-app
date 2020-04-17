import { put } from '../api';

const updateContact = async (contacts, payload) => {
	try {
		const ids = contacts.map(({ _id, _updatedAt }) => ({ _id, _updatedAt: { $date: _updatedAt } }));

		const { data: { data, success, errors } } = await put('/rest/data/Contact', { ids, data: payload });
		if (!success) throw errors;

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default updateContact;
