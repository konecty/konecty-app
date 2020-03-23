import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
			dispatch(loadUser());
		}
	}, [config]);

	if (user == null || config == null) {
		return <Loader />;
	}

	return (
		<Suspense fallback={<Loader />}>
			<Router>
				<Routes />
			</Router>
		</Suspense>
	);
};

export default App;
