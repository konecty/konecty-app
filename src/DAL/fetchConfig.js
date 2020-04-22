import axios from 'axios';

const fetchConfig = async (_, url) => {
	if (url) {
		const { data } = await axios.get(`//${url}/api/v2/app-config`);
		return {
			'konecty-url': `//${url}`,
			...data,
		};
	}
	const { data } = await axios.get('/config.json');
	return data;
};

export default fetchConfig;
