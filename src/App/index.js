import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import luxonAdapter from '@date-io/luxon';

import Routes from '../Routes';
import Loader from '../Components/Loader';

const App = () => {
	return (
		<MuiPickersUtilsProvider utils={luxonAdapter}>
			<CssBaseline />
			<Suspense fallback={<Loader />}>
				<Router>
					<Routes />
				</Router>
			</Suspense>
		</MuiPickersUtilsProvider>
	);
};

export default App;
