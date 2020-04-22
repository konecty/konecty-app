import { putRed as put, postRed as post } from '../api';

export const updateOpportunity = async (opportunities, payload) => {
	try {
		const ids = opportunities.map(({ _id }) => _id);
		const { data } = await put('/app/update-opportunity', { ids, data: payload });

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export const createOpportunity = async payload => {
	try {
		const { data } = await put('/app/create-opportunity', { data: payload });

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};
