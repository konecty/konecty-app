import { get } from './api';

const loadUserInfo = async () => {
	try {
		const { data } = await get('/rest/auth/info');
		return data;
	} catch (error) {
		return null;
	}
};

export default loadUserInfo;
