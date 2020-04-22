import { get } from './api';
import apiFilter from '../Util/apiFilter';

const fetchSymptoms = async () => {
	try {
		const {
			data: { data, success, errors },
		} = await get(
			'/rest/data/Symptoms/find?fields=code,name_pt-BR,name_en,section,indicator',
			apiFilter({}, { term: 'active', operator: 'equals', value: true }),
		);

		if (success && data.length) return data;
		if (!data.length) throw new Error('Symptoms not loaded.');

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default fetchSymptoms;
