import axios from 'axios';

const fetchConfig = async (_, url) => {
	if (url) {
		const http = /localhost/.test(url) ? 'http' : 'https';
		const { data } = await axios.get(`${http}://${url}/api/v2/app-config`);

		return {
			'konecty-url': `${http}://${url}`,
			...data,
		};
	}
	const { data } = await axios.get('/config.json');
	return data;
};

export default fetchConfig;
