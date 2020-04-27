import { get } from './api';
import apiFilter from '../Util/apiFilter';

const getPatients = async code => {
	try {
		const {
			data: { data, success, errors },
		} = await get('/rest/data/Contact/find?limit=1500', apiFilter({}, { term: 'type', operator: 'equals', value: 'Paciente' }));

		if (success && data.length) return data;
		if (!data.length) throw new Error('No patient found.');

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default getPatients;
