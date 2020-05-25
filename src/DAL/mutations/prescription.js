import { postRed as post } from '../api';

const prescription = async payload => {
	try {
		const { data } = await post('/memed/prescricao', payload);

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default prescription;
