import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import StateSample from './StateSample';
import Login from './Login';
import Detail from './Detail';
import ClientByRoom from './ClientByRoom';
import Memed from './Memed';

const PrivateRoute = ({ component, ...rest }) => {
	const isAuthenticated = useSelector(({ app: { user } }) => user != null && user.logged);

	return (
		<Route
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
			render={
				({ location, ...props }) =>
					isAuthenticated ? (
						React.createElement(component, { ...props, location })
					) : (
						<Redirect
							to={{
								pathname: '/login',
								search: location.search,
								state: { from: location },
							}}
						/>
					)
				// eslint-disable-next-line react/jsx-curly-newline
			}
		/>
	);
};

if (process.env.__DEV__) {
	PrivateRoute.displayName = 'KonectyPrivateRoute';

	PrivateRoute.propTypes = {
		children: PropTypes.node,
		component: PropTypes.func,
	};
}

const Routes = () => {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route exact path="/:konectyUrl/clientByRoom" component={ClientByRoom} />

			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute exact path="/detail/:code" component={Detail} />
			<PrivateRoute path="/state-sample" component={StateSample} />

			<Route path="/memed" component={Memed} />
		</Switch>
	);
};

export default Routes;
