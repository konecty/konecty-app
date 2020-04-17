import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filter, map, matchesProperty as propEq, toLower, reduce } from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconReturn from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import updateOpportunity from '../../DAL/mutations/opportunity';
import updateContact from '../../DAL/mutations/contact';

const Symptoms = ({ data, close }) => {
	const [selected, setSelected] = useState({});
	const [loading, setLoading] = useState(false);
	const { t, i18n } = useTranslation();
	const { symptoms: allSymptoms } = useSelector(({ app }) => app.config);

	// Theme defined colors
	const getColor = category => ({ Vermelha: 'statusRed', Amarela: 'statusYellow', Verde: 'statusGreen' }[category]);

	const symptoms = section => filter(allSymptoms, propEq('section', section));
	const translate = item => item[`name_${i18n.language}`];
	const onSelect = (row, value) => () => setSelected(sec => ({ ...sec, [row.code]: value }));

	const onClose = async () => {
		const payload = map(selected, (value, key) => ({ ...allSymptoms.find(propEq('code', Number(key))), value }));

		setLoading(true);
		const [{ severeSymptoms, mildSymptoms, healthProblems }] = await updateOpportunity([data], { symptoms: payload });
		await updateContact([data.contact], { severeSymptoms, mildSymptoms, healthProblems });

		close({ severeSymptoms, mildSymptoms, healthProblems, symptoms: payload });
	};

	useEffect(() => {
		if (!Array.isArray(data.symptoms)) return;

		// Initialize selected values from opportunity
		const values = reduce(data.symptoms, (acc, row) => ({ ...acc, [row.code]: row.value }), {});
		setSelected(values);
	}, []);

	if (!data) return null;

	const Symptom = row => (
		<Box display="flex" justifyContent="space-between" py={0.5} borderBottom="1px solid #d6d6d6">
			<Typography>
				{t('got-prefix')} {toLower(translate(row))}?
			</Typography>
			<ButtonGroup variant="contained" color="default" style={{ height: 'fit-content' }}>
				<Button onClick={onSelect(row, true)} color={selected[row.code] && 'primary'}>
					{t('y')}
				</Button>
				<Button onClick={onSelect(row, false)} color={selected[row.code] === false && 'primary'}>
					{t('n')}
				</Button>
			</ButtonGroup>
		</Box>
	);

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" onClick={onClose}>
						<IconReturn htmlColor="#fff" />
					</IconButton>
					<Typography>{t('opportunities')}</Typography>
				</Toolbar>
			</AppBar>
			<Box px={4} py={1} bgcolor={`${getColor(data.category)}.main`} color={`${getColor(data.category)}.contrastText`}>
				<Typography variant="subtitle2">
					{t('classification')}: {t(data.category)}
				</Typography>
			</Box>

			<Container>
				<Box my={2}>
					<Typography variant="h6" gutterBottom>
						{t('mild-symptoms')}
					</Typography>
					{map(symptoms('mild'), Symptom)}
				</Box>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						{t('severe-symptoms')}
					</Typography>
					{map(symptoms('severe'), Symptom)}
				</Box>

				<Box mb={2}>
					<Typography variant="h6" gutterBottom>
						{t('health-problems')}
					</Typography>
					{map(symptoms('healthProblems'), Symptom)}
				</Box>
			</Container>

			{loading && (
				<Box position="absolute" top="0" width="100%" bgcolor="rgba(255, 255, 255, 0.3)">
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
			category: PropTypes.string,
			symptoms: PropTypes.array,
			contact: PropTypes.object,
		}),
		close: PropTypes.func,
	};
}

export default Symptoms;
