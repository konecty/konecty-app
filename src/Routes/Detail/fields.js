import { get, map } from 'lodash';
import { set } from 'immutable';

export default ({ t, contact, setContact }) => {
	const personalFields = [
		{
			label: t('phone'),
			value: get(contact, 'phone'),
			transformValue: v => map(v, phone => phone.phoneNumber),
			onSave: value =>
				setContact(c =>
					set(
						c,
						'phone',
						value.split('\n').map(e => ({ phoneNumber: e })),
					),
				),
		},
		{
			label: t('gender'),
			value: get(contact, 'gender'),
			opts: ['Masculino', 'Feminino', 'Não se Aplica'],
			onSave: value => setContact(c => set(c, 'gender', value)),
		},
		{ label: t('age'), value: get(contact, 'age'), onSave: value => setContact(c => set(c, 'age', value)) },
		{ label: 'CPF', value: get(contact, 'cpf'), onSave: value => setContact(c => set(c, 'cpf', value)) },
		{ label: t('notes'), value: get(contact, 'notes'), onSave: value => setContact(c => set(c, 'notes', value)) },
	];

	const locationFields = [
		{
			label: t('state'),
			value: get(contact, 'address.0.state'),
			onSave: value => setContact(c => set(c, 'address.0.state', value)),
		},
		{
			label: t('city'),
			value: get(contact, 'address.0.city'),
			onSave: value => setContact(c => set(c, 'address.0.city', value)),
		},
		{
			label: t('district'),
			value: get(contact, 'address.0.district'),
			onSave: value => setContact(c => set(c, 'address.0.district', value)),
		},
	];

	const healthstatusFields = [
		{
			label: t('mild-symptoms'),
			value: get(contact, 'mildSymptoms'),
			onSave: value => setContact(c => set(c, 'mildSymptoms', value)),
		},
		{
			label: t('severe-symptoms'),
			value: get(contact, 'severeSymptoms'),
			onSave: value => setContact(c => set(c, 'severeSymptoms', value)),
		},
		{
			label: t('health-problems'),
			value: get(contact, 'healthProblems'),
			onSave: value => setContact(c => set(c, 'healthProblems', value)),
		},
		{
			label: t('short-of-breath'),
			value: get(contact, 'hasShortnessofBreath'),
			boolean: true,
			onSave: value => setContact(c => set(c, 'hasShortnessofBreath', value)),
		},
		{
			label: t('is-pregnant'),
			value: get(contact, 'isPregnant'),
			boolean: true,
			onSave: value => setContact(c => set(c, 'isPregnant', value)),
		},
		{
			label: t('risk-group'),
			value: get(contact, 'riskGroup'),
			boolean: true,
			onSave: value => setContact(c => set(c, 'riskGroup', value)),
		},
		{
			label: t('symptom-days'),
			value: get(contact, 'symptomDays'),
			onSave: value => setContact(c => set(c, 'symptomDays', value)),
		},
	];

	return { personalFields, locationFields, healthstatusFields };
};
