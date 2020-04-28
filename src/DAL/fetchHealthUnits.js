import { getRed as get } from './api';

const fetchHealthUnits = async payload => {
	try {
		const { data } = await get(`/healhUnits?coordinates=${payload}`);

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default fetchHealthUnits;
