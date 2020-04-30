import { get, find } from 'lodash';

export default ({ t, data }) => [
	{
		label: t('severe-symptoms'),
		value: get(data, 'severeSymptoms'),
		transformValue: value => value && value.replace(/\s?\(.*?\)/gi, ''),
	},
	{
		label: t('mild-symptoms'),
		value: get(data, 'mildSymptoms'),
		transformValue: value => value && value.replace(/\s?\(.*?\)/gi, ''),
	},
	{
		label: t('notes'),
		value: find(data.opportunities, item => item.status === 'Em Andamento') || {},
		transformValue: value => value.description,
	},
];
