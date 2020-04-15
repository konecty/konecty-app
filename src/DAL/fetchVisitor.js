import take from 'lodash/get';
import apiFilter from '../Util/apiFilter';
import { get } from './api';

const fetchVisitor = async ({ rid }) => {
	try {
		const {
			data: { data, success, errors },
		} = await get(
			'/rest/data/Opportunity/find?fields=code,contact',
			apiFilter({}, { term: 'livechatId', operator: 'equals', value: rid }),
		);

		if (success && data.length) return take(data, '0.contact');

		if (!data.length) {
			console.log(`No Opportunity found from with RID ${rid}.`);
			return null;
		}

		throw errors;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default fetchVisitor;
