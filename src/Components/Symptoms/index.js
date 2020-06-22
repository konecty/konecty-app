import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filter, map, matchesProperty as propEq, toLower, pick, reduce, get } from 'lodash';

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
import { DatePicker } from '@material-ui/pickers';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { updateOpportunity, createOpportunity } from '../../DAL/mutations/opportunity';
import setSymptomsDefaults from '../../Util/symptomsDefaults';

const Symptoms = ({ data, save, cancel }) => {
	if (!data) return null;

	const [selected, setSelected] = useState({ ...data, symptoms: {} });
	const [loading, setLoading] = useState(false);
	const { t, i18n } = useTranslation();
	const {
		config: { symptoms: allSymptoms },
		rid,
	} = useSelector(({ app }) => app);

	const symptoms = section => filter(allSymptoms, propEq('section', section));
	const translate = item => item['name_pt-BR']; // item[`name_${i18n.language}`];
	const onSelect = (key, value) => () => setSelected(sec => ({ ...sec, symptoms: { ...sec.symptoms, [key]: value } }));
	const isMentalRoom = get(data, 'contact.isMentalHealthRoom');

	const onClose = async () => {
		const payload = pick(selected, ['symptoms', 'description', 'isPregnant', 'contact', 'symptomsStart']);
		payload.symptoms = map(payload.symptoms, (value, key) => ({ ...allSymptoms.find(propEq('indicator', key)), value }));
		payload.rid = rid;

		// If it is a Luxon date instance, convert to iso
		if (payload.symptomsStart && payload.symptomsStart.toISO) {
			payload.symptomsStart = payload.symptomsStart.toISO();
		}

		setLoading(true);
		let processedFields;
		if (data.code) {
			processedFields = await updateOpportunity([data], payload);
		} else {
			payload.contact = data.contact;
			payload.status = 'Em Andamento';
			processedFields = await createOpportunity(payload);
		}

		setLoading(false);
		save(processedFields);
	};

	useEffect(() => {
		// Set all falsy answers to false, so as to mark the "no" button
		const symptomsDefaults = setSymptomsDefaults(selected);

		// If none mild symptoms was answered, set them to "null"
		const isMildAnswered = symptoms('mild').some(item => get(selected, 'symptomIndicators', {})[item.indicator] != null);
		if (!isMildAnswered) {
			const indicators = reduce(symptoms('mild'), (acc, value) => ({ ...acc, [value.indicator]: null }), {});
			symptomsDefaults.symptomIndicators = { ...symptomsDefaults.symptomIndicators, ...indicators };
		}

		setSelected(sec => ({
			...sec,
			symptoms: {
				...symptomsDefaults.symptomIndicators,
				...symptomsDefaults.healthProblemsIndicators,
			},
		}));
	}, []);
	const getColor = category => ({ Vermelha: 'statusRed', Amarela: 'statusYellow', Verde: 'statusGreen' }[category]);

	const Symptom = ({ code, indicator: key, ...rest }) => (
		<Box key={code} display="flex" justifyContent="space-between" alignItems="center" py={1} borderBottom="1px solid #d6d6d6">
			<Typography>
				{t('got-prefix')} {toLower(translate(rest))}?
			</Typography>
			<ButtonGroup variant="contained" color="default" style={{ height: 'fit-content' }}>
				<Button onClick={onSelect(key, true)} color={selected.symptoms[key] && 'primary'} disableElevation>
					{t('y')}
				</Button>
				<Button onClick={onSelect(key, false)} color={selected.symptoms[key] === false && 'primary'} disableElevation>
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
			<Box py={1} bgcolor={`${getColor(selected.category)}.main`} color={`${getColor(selected.category)}.contrastText`}>
				<Container maxWidth="sm">
					<Typography variant="subtitle2">
						{t('classification')}: {t(selected.category)}
					</Typography>
				</Container>
			</Box>
			<Container maxWidth="sm">
				{isMentalRoom && (
					<Box my={2}>
						<Typography variant="h6" gutterBottom>
							{t('mental-problems')}
						</Typography>
						{map(symptoms('mentalProblems'), Symptom)}
					</Box>
				)}
				{!isMentalRoom && (
					<>
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
					</>
				)}
			</Container>
			<Container maxWidth="sm" style={{ marginTop: '3rem' }}>
				{!isMentalRoom && (
					<>
						<FormControl style={{ marginBottom: '1rem' }} fullWidth>
							<InputLabel htmlFor="preg-select">{t('is-pregnant')}</InputLabel>

							<Select
								id="preg-select"
								value={selected.isPregnant ? 'y' : 'n'}
								fullWidth
								onChange={({ target }) => setSelected(c => ({ ...c, isPregnant: target.value === 'y' }))}
							>
								{['y', 'n'].map(cat => (
									<MenuItem key={cat} value={cat}>
										{t(cat)}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<DatePicker
							label={t('symptom-start')}
							value={selected.symptomsStart || null}
							format={t('date-format')}
							disableFuture
							onChange={value => setSelected(c => ({ ...c, symptomsStart: value }))}
							style={{ marginBottom: '1rem', width: '100%' }}
							TextFieldComponent={props => <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />}
						/>
						<TextField
							label={t('notes')}
							value={selected.description}
							onChange={({ target }) => setSelected(c => ({ ...c, description: target.value }))}
							InputLabelProps={{ shrink: true }}
							multiline
							fullWidth
						/>
					</>
				)}

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
