import { get } from './api';
import apiFilter from '../Util/apiFilter';

const getContact = async code => {
	try {
		const {
			data: { data, success, errors },
		} = await get('/rest/data/Contact/find', apiFilter({}, { term: 'code', operator: 'equals', value: code }));

		if (success && data.length) return data;
		if (!data.length) throw new Error(`No contact found with code ${code}.`);

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getContact;
