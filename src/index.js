import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ReactQueryConfigProvider } from 'react-query';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './Theme';

import App from './App';
import rootReducer from './rootReducer';
import rootSagas from './rootSagas';

import './i18n';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(sagaMiddleware /* other middleware */),
		/* other store enhancers if any */
	),
);

const queryConfig = {
	suspense: true,
};

sagaMiddleware.run(rootSagas);

render(
	<ReactQueryConfigProvider config={queryConfig}>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</ReactQueryConfigProvider>,
	document.getElementById('main'),
);
