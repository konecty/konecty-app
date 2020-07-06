import axios from 'axios';

const fetchConfig = async (_, url) => {
	if (url) {
		const { data } = await axios.get(`https://${url}/api/v2/app-config`);
		return {
			'konecty-url': `https://${url}`,
			...data,
		};
	}
	const { data } = await axios.get('/config.json');
	return data;
};

export default fetchConfig;
