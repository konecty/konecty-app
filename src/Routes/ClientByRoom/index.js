import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import reduce from 'lodash/reduce';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';

import Loader from '../../Components/Loader';
import fetchVisitor from '../../DAL/fetchVisitor';

import { loadConfig, loadUser } from '../../App/actions';

import Detail from '../Detail';

const ClientByToken = () => {
	// const [to, setTo] = useState(null);
	const { t } = useTranslation();
	const [roomId, setRoomId] = useState();
	const [localError, setLocalError] = useState();

	const { konectyUrl } = useParams();
	const location = useLocation();

	const dispatch = useDispatch();
	const { user, config } = useSelector(({ app }) => app);

	const { data, error, isFetching } = useQuery(user && roomId && ['visitor', roomId], fetchVisitor);

	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [error]);

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
		// eslint-disable-next-line no-console
		console.error(error);
		return <p>{t('error-message')}</p>;
	}

	if (user == null || config == null || isFetching) {
		return <Loader />;
	}

	return <Detail match={{ params: { code: data.code } }} />;
};

export default ClientByToken;
