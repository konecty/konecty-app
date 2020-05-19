/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { map, get } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import ChevronRight from '@material-ui/icons/ChevronRight';

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import fetchPatients from '../../DAL/fetchPatients';

import Loader from '../../Components/Loader';
import Link from '../../Components/Link';

import { loadConfig, loadUser } from '../../App/actions';

const Home = () => {
	const { t } = useTranslation();
	const [contacts, setContacts] = useState(null);
	const [loading, setLoading] = useState(true);
	const { config } = useSelector(({ app }) => app);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!config) dispatch(loadConfig());
	}, []);

	useEffect(() => {
		if (config != null && !config.symptoms) {
			dispatch(
				loadUser({
					encrypted: false,
				}),
			);
		}
	}, [config]);

	useEffect(() => {
		if (contacts) setLoading(false);
		else {
			setLoading(true);
			fetchPatients().then(setContacts).catch(setContacts);
		}
	}, [contacts]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			<Box mb={3} py={5} px={2} w={1} bgcolor="primary.main" color="primary.contrastText">
				{t('all-patients')}
			</Box>
			<List>
				{map(contacts, contact => (
					<ListItem key={contact._id} component={props => <Link to={`/detail/${get(contact, 'code')}`} {...props} />}>
						<ListItemText primary={get(contact, 'name.full')} secondary={get(contact, 'status')} />
						<ListItemSecondaryAction>
							<ChevronRight />
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default Home;
