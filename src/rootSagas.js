import { all } from 'redux-saga/effects';

import stateSampleSaga from './Routes/StateSample/sagas';
import appSaga from './App/sagas';
import loginSaga from './Routes/Login/sagas';
import detailSaga from './Routes/Detail/sagas';

export default function* rootSaga() {
	yield all([stateSampleSaga(), appSaga(), loginSaga(), detailSaga()]);
	// code after all-effect
}
