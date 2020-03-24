import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import GeneralList from './GeneralList';
import ItemSheet from './ItemSheet';
import StateSample from './StateSample';
import Login from './Login';

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
		children: PropTypes.node.isRequired,
	};
}

const Routes = () => {
	return (
		<Switch>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/list/:code">
				<GeneralList />
			</Route>
			<Route path="/record/:code">
				<ItemSheet />
			</Route>
			<PrivateRoute exact path="/">
				<Home />
			</PrivateRoute>
			<PrivateRoute path="/state-sample">
				<StateSample />
			</PrivateRoute>
		</Switch>
	);
};

export default Routes;
