import { get, find } from 'lodash';
import { normalizeSymptoms } from '../../../Util/format';

export default ({ t, data }) => [
	{
		label: t('severe-symptoms'),
		value: get(data, 'severeSymptoms'),
		transformValue: normalizeSymptoms,
	},
	{
		label: t('mild-symptoms'),
		value: get(data, 'mildSymptoms'),
		transformValue: normalizeSymptoms,
	},
	{
		label: t('notes'),
		value: find(data.opportunities, item => item.status === 'Em Andamento') || {},
		transformValue: value => value.description,
	},
];
