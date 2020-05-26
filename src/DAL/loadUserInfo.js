import { getRed as get } from './api';

const loadUserInfo = async param => {
	try {
		const opts = {};
		if (param && param.token) {
			opts.headers = { Authorization: param.token };
		}

		const { data } = await get('/loadUser', opts);
		return data;
	} catch (error) {
		return null;
	}
};

export default loadUserInfo;
