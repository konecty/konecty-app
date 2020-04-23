import take from 'lodash/get';
import apiFilter from '../Util/apiFilter';
import { get } from './api';

const fetchVisitor = async (_, rid) => {
	if (rid == null) {
		return null;
	}

	const {
		data: { data, success },
	} = await get(
		'/rest/data/Opportunity/find?fields=code,contact',
		apiFilter({}, { term: 'livechatId', operator: 'equals', value: rid }),
	);

	if (success && data.length) return take(data, '0.contact');

	return null;
};

export default fetchVisitor;
