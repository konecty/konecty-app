import { get } from './api';
import apiFilter from '../Util/apiFilter';
import fetchHealthUnits from './fetchHealthUnits';

const getContact = async code => {
	try {
		const {
			data: { data, success, errors },
		} = await get('/rest/data/Contact/find', apiFilter({}, { term: 'code', operator: 'equals', value: code }));

		if (!data.length) throw new Error(`No contact found with code ${code}.`);
		if (errors) throw errors;

		if (data[0] && data[0].location) {
			const hu = await fetchHealthUnits(data[0].location.coordinates.join());
			data.healthUnits = hu;
		}
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getContact;
