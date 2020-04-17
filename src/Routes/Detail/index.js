import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, pick } from 'lodash';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SlideAnimation from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useTranslation } from 'react-i18next';
import useStyles from './useStyles';

import fetchContact from '../../DAL/fetchContact';
import fetchTasks from '../../DAL/fetchTasks';
import fetchOpportunities from '../../DAL/fetchOpportunities';
import updateContact from '../../DAL/mutations/contact';

import Loader from '../../Components/Loader';
import { Treatment as TreatmentList, Task as TaskList } from '../../Components/RecordList';
import DisplayForm from '../../Components/DisplayForm';
import Symptoms from '../../Components/Symptoms';
import getFields from './fields';

const Detail = ({ match }) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const [contact, setContact] = useState(null);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(null);

	const getDetails = async code => {
		try {
			const [[person] = [], tasks, opportunities] = await Promise.all([
				fetchContact(code),
				// fetchTasks(code),
				Promise.resolve([]),
				fetchOpportunities(code),
			]);

			if (person) {
				return {
					...person,
					tasks,
					opportunities,
				};
			}

			return { code };
		} catch (e) {
			return { code };
		}
	};

	useEffect(() => {
		const routeCode = Number(match.params.code);
		const loaded = contact && contact.code === routeCode;

		if (loaded) setLoading(false);
		else {
			setLoading(true);
			getDetails(routeCode).then(setContact).catch(setContact);
		}
	}, [contact]);

	if (loading) {
		return <Loader />;
	}

	if (!contact._id) {
		return <Typography>No contact found with that code.</Typography>;
	}

	// Update state when opportunity saved
	const onCloseEdit = ({ severeSymptoms, mildSymptoms, healthProblems, symptoms, category, description }) => {
		setContact(oldData => {
			const newData = Object.assign(oldData, { severeSymptoms, mildSymptoms, healthProblems });
			const opIdx = oldData.opportunities.findIndex(op => op.code === current.code);
			newData.opportunities[opIdx] = Object.assign(oldData.opportunities[opIdx], {
				severeSymptoms,
				mildSymptoms,
				healthProblems,
				symptoms,
				category,
				description,
			});

			return newData;
		});
		setCurrent(null);
	};
	const onEdit = item => e => {
		e.stopPropagation();
		setCurrent({ ...item, contact: pick(contact, ['_id', '_updatedAt']) });
	};

	// Update state and Konecty data when the fields are saved
	const onFieldsSave = data => {
		setContact({ ...contact, ...data });
		updateContact([contact], data);
	};

	const getColor = category => ({ Vermelha: 'statusRed', Amarela: 'statusYellow', Verde: 'statusGreen' }[category]);

	const { personalFields, locationFields, healthstatusFields } = getFields({ t, contact });

	return (
		<>
			<div style={{ display: current ? 'none' : 'initial' }}>
				<AppBar position="static">
					<Toolbar style={{ padding: 0 }}>
						<Container maxWidth="sm">
							<Typography variant="subtitle1" component="h1" className={classes.title}>
								{get(contact, 'name.full', '').trim()}
							</Typography>
						</Container>
					</Toolbar>
				</AppBar>
				<Box py={1} bgcolor={`${getColor(contact.category)}.main`} color={`${getColor(contact.category)}.contrastText`}>
					<Container maxWidth="sm">
						<Typography variant="subtitle2">
							{t('classification')}: {t(contact.category)}
						</Typography>
					</Container>
				</Box>
				<Container maxWidth="sm" className={classes.root}>
					<Box my={2}>
						<DisplayForm title={t('personal-data')} fields={personalFields} onSave={onFieldsSave} editable />
						<DisplayForm title={t('location')} fields={locationFields} onSave={onFieldsSave} editable />
						<DisplayForm title={t('health-status')} fields={healthstatusFields} />
					</Box>

					<Box my={2}>
						<Typography variant="h5" component="h2" className={classes.title}>
							{t('opportunities')}
						</Typography>
						<TreatmentList items={contact.opportunities} onEdit={onEdit} />
					</Box>
				</Container>
			</div>
			<SlideAnimation in={!!current} direction="down" mountOnEnter unmountOnExit>
				<Box bgcolor="#fff">
					<Symptoms data={current} save={onCloseEdit} cancel={() => setCurrent(null)} />
				</Box>
			</SlideAnimation>
		</>
	);
};

if (process.env.__DEV__) {
	Detail.displayName = 'DetailView';

	Detail.propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				code: PropTypes.string,
			}),
		}),
	};
}

export default Detail;
