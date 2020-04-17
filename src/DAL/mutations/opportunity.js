import { put } from '../api';

const updateOpportunity = async (data, payload) => {
	try {
		const { _id, _updatedAt } = data;
		const ids = [{ _id, _updatedAt: { $date: _updatedAt } }];
		const { data: res } = await put('/rest/data/Opportunity', { ids, data: payload });

		return res;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default updateOpportunity;
