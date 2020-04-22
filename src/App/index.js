import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from '../Routes';
import Loader from '../Components/Loader';

const App = () => {
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
