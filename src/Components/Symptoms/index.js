import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filter, map, matchesProperty as propEq, toLower, pick } from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconReturn from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CheckIcon from '@material-ui/icons/Check';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { updateOpportunity, createOpportunity } from '../../DAL/mutations/opportunity';
import updateContact from '../../DAL/mutations/contact';

const Symptoms = ({ data, save, cancel }) => {
	if (!data) return null;

	const [selected, setSelected] = useState({ ...data, symptoms: {} });
	const [loading, setLoading] = useState(false);
	const { t, i18n } = useTranslation();
	const { symptoms: allSymptoms } = useSelector(({ app }) => app.config);

	const symptoms = section => filter(allSymptoms, propEq('section', section));
	const translate = item => item['name_pt-BR']; // item[`name_${i18n.language}`];
	const onSelect = (key, value) => () => setSelected(sec => ({ ...sec, symptoms: { ...sec.symptoms, [key]: value } }));

	const onClose = async () => {
		const payload = pick(selected, ['symptoms', 'description', 'isPregnant', 'symptomDays']);
		payload.symptoms = map(payload.symptoms, (value, key) => ({ ...allSymptoms.find(propEq('indicator', key)), value }));

		setLoading(true);
		let processedFields;
		if (data.code) {
			processedFields = await updateOpportunity([data], payload);
		} else {
			payload.contact = data.contact;
			payload.status = 'Em Andamento';
			processedFields = await createOpportunity(payload);
		}

		await updateContact([data.contact], processedFields);
		setLoading(false);

		save(processedFields);
	};

	useEffect(() => {
		setSelected(sec => ({
			...sec,
			symptoms: {
				...sec.symptomIndicators,
				...sec.healthProblemsIndicators,
			},
		}));
	}, []);

	const Symptom = ({ code, indicator: key, ...rest }) => (
		<Box key={code} display="flex" justifyContent="space-between" alignItems="center" py={1} borderBottom="1px solid #d6d6d6">
			<Typography>
				{t('got-prefix')} {toLower(translate(rest))}?
			</Typography>
			<ButtonGroup variant="contained" color="default" style={{ height: 'fit-content' }}>
				<Button onClick={onSelect(key, true)} color={selected.symptoms[key] && 'primary'} disableElevation>
					{t('y')}
				</Button>
				<Button onClick={onSelect(key, false)} color={!selected.symptoms[key] && 'primary'} disableElevation>
					{t('n')}
				</Button>
			</ButtonGroup>
		</Box>
	);

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="sm" style={{ padding: 0 }}>
					<Toolbar>
						<IconButton edge="start" onClick={cancel}>
							<IconReturn htmlColor="#fff" />
						</IconButton>
						<Typography variant="subtitle1" component="h1">
							{t('opportunities')}
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
			<Container maxWidth="sm">
				<Box my={2}>
					<Typography variant="h6" gutterBottom>
						{t('severe-symptoms')}
					</Typography>
					{map(symptoms('severe'), Symptom)}
				</Box>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						{t('mild-symptoms')}
					</Typography>
					{map(symptoms('mild'), Symptom)}
				</Box>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						{t('health-problems')}
					</Typography>
					{map(symptoms('healthProblems'), Symptom)}
				</Box>
			</Container>
			<Container maxWidth="sm" style={{ marginTop: '3rem' }}>
				<FormControl style={{ marginBottom: '1rem' }} fullWidth>
					<InputLabel htmlFor="preg-select">{t('is-pregnant')}</InputLabel>

					<Select
						id="preg-select"
						value={selected.isPregnant ? 'y' : 'n'}
						fullWidth
						onChange={({ target }) => setSelected(c => ({ ...c, isPregnant: target.value === 'y' }))}
					>
						{['y', 'n'].map(cat => (
							<MenuItem value={cat}>{t(cat)}</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					label={t('symptom-days')}
					value={selected.symptomDays}
					onChange={({ target }) => setSelected(c => ({ ...c, symptomDays: Number(target.value) }))}
					style={{ marginBottom: '1rem' }}
					multiline
					fullWidth
				/>
				<TextField
					label={t('notes')}
					value={selected.description}
					onChange={({ target }) => setSelected(c => ({ ...c, description: target.value }))}
					shrink
					multiline
					fullWidth
				/>
				<Box mt={4} mb={2} display="flex" justifyContent="space-between">
					<Box width={0.52}>
						<Button variant="contained" color="primary" fullWidth onClick={onClose} startIcon={<CheckIcon />}>
							{t('save')}
						</Button>
					</Box>
					<Box width={0.45}>
						<Button variant="contained" color="default" fullWidth onClick={cancel}>
							{t('cancel')}
						</Button>
					</Box>
				</Box>
			</Container>

			{loading && (
				<Box position="fixed" top="0" bottom="0" width="100%" bgcolor="rgba(255, 255, 255, 0.3)">
					<Loader />
				</Box>
			)}
		</>
	);
};

if (process.env.__DEV__) {
	Symptoms.displayName = 'UpdateOpportunity';

	Symptoms.propTypes = {
		data: PropTypes.shape({
			code: PropTypes.number,
			category: PropTypes.string,
			symptomIndicators: PropTypes.object,
			contact: PropTypes.object,
		}),
		save: PropTypes.func,
		cancel: PropTypes.func,
	};
}

export default Symptoms;
