import axios from 'axios';
import { getItem } from 'localforage';
import { queryCache } from 'react-query';

// eslint-disable-next-line import/prefer-default-export
export const get = async (...args) => {
	const token = await getItem('userKey');
	const config = await queryCache.getQueryData('config');
	if (config != null) {
		const axiosInstance = axios.create({
			baseURL: config['konecty-url'],
			headers: {
				Authorization: token,
			},
		});
		return axiosInstance.get(...args);
	}
	return null;
};
