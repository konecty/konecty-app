import { get, map, find, startCase, toLower } from 'lodash';
import { set } from 'immutable';
import { DateTime } from 'luxon';

const polite = string => startCase(toLower(string));

export default ({ t, contact }) => {
	const personalFields = [
		{
			label: t('name'),
			value: get(contact, 'name.full'),
			onSave: (data, value) =>
				set(data, 'name', {
					first: value.split(' ').shift(),
					last: value.split(' ').slice(1).join(' '),
					full: value,
				}),
		},
		{
			label: t('phone'),
			value: get(contact, 'phone'),
			transformValue: v => map(v, phone => phone.phoneNumber),
			onSave: (data, value) =>
				set(
					data,
					'phone',
					value.split('\n').map(e => ({ phoneNumber: e, countryCode: get(contact, 'phone.0.countryCode', 55) })),
				),
		},
		{
			label: t('gender'),
			value: get(contact, 'gender'),
			opts: ['Masculino', 'Feminino', 'Não se Aplica'],
			onSave: (data, value) => set(data, 'gender', value),
		},
		{ label: t('age'), value: get(contact, 'age'), onSave: (data, value) => set(data, 'age', value) },
		{ label: 'CPF', value: get(contact, 'CPF'), onSave: (data, value) => set(data, 'CPF', value) },
		{
			label: t('state'),
			value: get(contact, 'address.0.state'),
			readOnly: true,
			onSave: (data, value) =>
				set(data, 'address', [{ ...get(contact, 'address.0'), ...get(data, 'address.0', {}), state: value }]),
		},
		{
			label: t('city'),
			value: get(contact, 'city'),
			readOnly: true,
			onSave: (data, value) => set(data, 'city', value),
		},
		{
			label: t('district'),
			value: get(contact, 'district'),
			readOnly: true,
			onSave: (data, value) => set(data, 'district', value),
		},
		{
			label: t('registration-time-expired'),
			value: get(contact, 'registerExpired'),
			boolean: true,
			readOnly: true,
		},
		{ label: t('notes'), value: get(contact, 'notes'), onSave: (data, value) => set(data, 'notes', value) },
	];

	const healthstatusFields = [
		{
			label: t('severe-symptoms'),
			value: get(contact, 'severeSymptoms'),
			transformValue: value => value && value.replace(/\s?\(.*?\)/gi, ''),
			onSave: (data, value) => set(data, 'severeSymptoms', value),
		},
		{
			label: t('mild-symptoms'),
			value: get(contact, 'mildSymptoms'),
			transformValue: value => value && value.replace(/\s?\(.*?\)/gi, ''),
			onSave: (data, value) => set(data, 'mildSymptoms', value),
		},
		{
			label: t('health-problems'),
			value: get(contact, 'healthProblems'),
			transformValue: value => value && value.replace(/\s?\(.*?\)/gi, ''),
			onSave: (data, value) => set(data, 'healthProblems', value),
		},
		{
			label: t('is-pregnant'),
			value: get(contact, 'isPregnant'),
			boolean: true,
			onSave: (data, value) => set(data, 'isPregnant', value),
		},
		{
			label: t('risk-group'),
			value: get(contact, 'riskGroup'),
			boolean: true,
			onSave: (data, value) => set(data, 'riskGroup', value),
		},
		{
			label: t('symptom-start'),
			value: get(contact, 'symptomsStart'),
			transformValue: value => (value ? DateTime.fromISO(value).toFormat(t('date-format')) : null),
			onSave: (data, value) => set(data, 'symptomsStart', value),
		},
		{
			label: t('notes'),
			value: find(contact.opportunities, item => item.status === 'Em Andamento') || {},
			transformValue: value => value.description,
		},
		{
			label: t('nearest-health-unit'),
			value: get(contact, 'healthUnits'),
			transformValue: value => [].concat(...map(value, hu => [hu.type, polite(hu.name), polite(hu.address), ''])),
			readOnly: true,
			dispensable: true,
		},
	];

	return { personalFields, healthstatusFields };
};
