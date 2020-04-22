import axios from 'axios';

const fetchConfig = async () => {
	const { data } = await axios.get('config.json');
	return data;
};

export default fetchConfig;
