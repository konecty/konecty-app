import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import RecordList from '../../Components/RecordList';
import { AppBarItem } from '../../Components/AppBar';
import useStyles from './useStyles';

import { loadDetails, loadTasks, loadOpportunities } from './actions';
import Loader from '../../Components/Loader';

const Detail = ({ match }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { contact } = useSelector(({ app }) => app);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const routeCode = Number(match.params.code);
		const loaded = contact && contact.code === routeCode;

		if (loaded) setLoading(false);
		else {
			setLoading(true);
			dispatch(loadDetails(routeCode));
			dispatch(loadTasks(routeCode));
			dispatch(loadOpportunities(routeCode));
		}
	}, [contact]);

	if (loading) {
		return <Loader />;
	}

	if (!contact._id) {
		return <Typography>No contact found with that code.</Typography>;
	}

	const birth = get(contact, 'birthdate') && new Date(contact.birthdate).getFullYear();
	return (
		<>
			<AppBarItem />
			<Box className={classes.box}>
				<Container maxWidth="sm">
					<Typography variant="h4" component="h1" className={classes.title}>
						{get(contact, 'name.full', '').trim()}
					</Typography>
					<Box>
						{get(contact, 'status') && <Chip color="white" label={get(contact, 'status')} className={classes.chip} />}
						{get(contact, 'type') && <Chip color="white" label={get(contact, 'type')} className={classes.chip} />}
					</Box>
				</Container>
			</Box>
			<Container maxWidth="sm" className={classes.root}>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						{t('personal-data')}
					</Typography>

					{get(contact, 'phone', []).length > 0 && (
						<>
							<TextField
								label={t('phone')}
								size="small"
								inputProps={{ readOnly: true, 'aria-readonly': true }}
								multiline={contact.phone.length > 1}
								rows={contact.phone.length}
								value={map(contact.phone, phone => phone.phoneNumber).join('\n')}
							/>
						</>
					)}
					{get(contact, 'gender') && (
						<TextField
							label={t('gender')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'gender')}
						/>
					)}
					{birth && (
						<TextField
							label={t('age')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={`${new Date().getFullYear() - birth} (TODO)`}
						/>
					)}
					{get(contact, 'notes') && (
						<TextField
							label={t('observation')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'notes')}
						/>
					)}
				</Box>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						{t('prognostic')}
					</Typography>

					{get(contact, 'category') && (
						<TextField
							label={t('category')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'category')}
						/>
					)}
					{get(contact, 'mildSymptoms') && (
						<TextField
							label={t('mild-symptoms')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'mildSymptoms')}
						/>
					)}
					{get(contact, 'severeSymptoms') && (
						<TextField
							label={t('severe-symptoms')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'severeSymptoms')}
						/>
					)}
					{get(contact, 'hasFever') != null && (
						<TextField
							label={t('has-fever')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'hasFever') ? t('y') : t('n')}
						/>
					)}
					{get(contact, 'riskGroup') != null && (
						<TextField
							label={t('risk-group')}
							size="small"
							inputProps={{ readOnly: true, 'aria-readonly': true }}
							value={get(contact, 'riskGroup') ? t('y') : t('n')}
						/>
					)}
				</Box>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						{t('opportunities')}
					</Typography>
					<RecordList />
				</Box>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						{t('activities')}
					</Typography>
					<RecordList />
				</Box>
			</Container>
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
