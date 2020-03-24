import { get } from './api';
import apiFilter from '../Util/apiFilter';

const getOpportunities = async code => {
	try {
		const {
			data: { data, success, errors },
		} = await get('/rest/data/Opportunity/find', apiFilter({}, { term: 'contact.code', operator: 'equals', value: code }));

		if (success && data.length) return data;
		if (!data.length) {
			console.log(`No Opportunity found from contact ${code}.`);
			return null;
		}

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getOpportunities;
