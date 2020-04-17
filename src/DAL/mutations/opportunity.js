import { put } from '../api';

const updateOpportunity = async (opportunities, payload) => {
	try {
		const ids = opportunities.map(({ _id, _updatedAt }) => ({ _id, _updatedAt: { $date: _updatedAt } }));

		if (payload.symptoms) {
			const { symptoms } = payload;

			// TODO Translate symptoms names
			const getSymptomsString = section =>
				symptoms
					.filter(item => item.section === section && item.value === true)
					.map(item => item['name_pt-BR'])
					.join(', ');

			payload.mildSymptoms = getSymptomsString('mild');
			payload.severeSymptoms = getSymptomsString('severe');
			payload.healthProblems = getSymptomsString('healthProblems');
		}

		const { data: { data, success, errors } } = await put('/rest/data/Opportunity', { ids, data: payload });
		if (!success) throw errors;

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default updateOpportunity;
