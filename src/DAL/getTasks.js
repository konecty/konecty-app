import { get } from './api';
import apiFilter from '../Util/apiFilter';

const getTasks = async code => {
	try {
		const {
			data: { data, success, errors },
		} = await get('/rest/data/Activity/find', apiFilter({}, { term: 'contact.code', operator: 'equals', value: code }));

		if (success && data.length) return data;
		if (!data.length) {
			console.log(`No Activity found from contact ${code}.`);
			return null;
		}

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getTasks;
