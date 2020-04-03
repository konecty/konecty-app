import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from '../Routes';
import Loader from '../Components/Loader';
import { loadConfig, loadUser } from './actions';

const App = () => {
	const dispatch = useDispatch();
	const { user, config } = useSelector(({ app }) => app);

	useEffect(() => {
		dispatch(loadConfig());
	}, [dispatch]);

	useEffect(() => {
		if (config != null) {
			let param;
			const search = new URLSearchParams(window.location.search);
			const token = search.get('t');

			if (token) {
				if (!config.jwk) {
					throw new Error('Token encrypted, but missing JWK');
				}

				param = { encrypted: true, token, jwk: config.jwk };
			}

			dispatch(loadUser(param));
		}
	}, [config]);

	if (user == null || config == null) {
		return <Loader />;
	}

	return (
		<>
			<CssBaseline />
			<Suspense fallback={<Loader />}>
				<Router>
					<Routes />
				</Router>
			</Suspense>
		</>
	);
};

export default App;
