import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import GeneralList from './GeneralList';
import ItemSheet from './ItemSheet';
import StateSample from './StateSample';
import Login from './Login';
import Detail from './Detail';

const PrivateRoute = ({ children, ...rest }) => {
	const isAuthenticated = useSelector(({ app: { user } }) => user != null && user.logged);

	return (
		<Route
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
			render={
				({ location }) =>
					isAuthenticated ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/login',
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
			<Route path="/list/:code" component={GeneralList} />
			<Route path="/record/:code" component={ItemSheet} />

			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute exact path="/detail/:code" component={Detail} />
			<PrivateRoute path="/state-sample" component={StateSample} />
		</Switch>
	);
};

export default Routes;
