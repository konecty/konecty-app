import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import reduce from 'lodash/reduce';
import { useQuery, setFocusHandler } from 'react-query';
import { useTranslation } from 'react-i18next';

import Loader from '../../Components/Loader';
import ElegantError from '../../Components/Error';
import fetchVisitor from '../../DAL/fetchVisitor';

import { loadConfig, loadUser } from '../../App/actions';

import Detail from '../Detail';

const ClientByToken = () => {
	const { t } = useTranslation();
	const [roomId, setRoomId] = useState();
	const [localError, setLocalError] = useState();

	const { konectyUrl } = useParams();
	const location = useLocation();

	const dispatch = useDispatch();
	const { user, config } = useSelector(({ app }) => app);

	// Remove react-query onfocus re-fetch to prevent it
	// from re-rendering the whole page everytime the user focus it again
	setFocusHandler(handler => () => {
		window.removeEventListener('visibilitychange', handler);
		window.removeEventListener('focus', handler);
	});
	const { data, isFetching } = useQuery(user && roomId && ['visitor', roomId], fetchVisitor);

	useEffect(() => {
		if (!data && !isFetching) {
			setLocalError(true);
		}
	}, [data, isFetching]);

	useEffect(() => {
		dispatch(loadConfig(konectyUrl));
	}, [dispatch, konectyUrl]);

	useEffect(() => {
		if (config != null) {
			const search = new URLSearchParams(location.search);
			if (search != null) {
				const { rid, t: token } = reduce([...search.entries()], (acc, [k, v]) => ({ ...acc, [k]: v }), {});
				if (t != null) {
					dispatch(
						loadUser({
							encrypted: true,
							token,
							jwk: config.jwk,
						}),
					);
					setRoomId(rid);
				}
			}
		}
	}, [config]);

	if (localError != null) {
		return <ElegantError text={t('error-opportunity-not-found')} fullScreen />;
	}

	if (user == null || config == null || isFetching || (!data && !localError)) {
		return <Loader />;
	}

	// Render the page instead of redirecting to it
	// so as to mantain the contact code type [string, number]
	return <Detail match={{ params: { code: data.code } }} />;
};

export default ClientByToken;
