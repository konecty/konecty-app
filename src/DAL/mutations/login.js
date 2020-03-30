import { post } from '../api';

export default async payload => {
	try {
		const { data } = await post('/rest/auth/login', payload);
		return data;
	} catch (e) {
		console.error(e);
		return {};
	}
};
