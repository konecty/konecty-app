import { postRed as post } from '../api';

const prescription = async payload => {
    console.log("payload", payload)
	try {
		const data = await post('/memed/prescricao', payload);
        console.log("data", data)

		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};

export default prescription;
