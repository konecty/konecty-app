import { all } from 'redux-saga/effects';

import stateSampleSaga from './Routes/StateSample/sagas';
import appSaga from './App/sagas';
import loginSaga from './Routes/Login/sagas';

export default function* rootSaga() {
	yield all([stateSampleSaga(), appSaga(), loginSaga()]);
	// code after all-effect
}
