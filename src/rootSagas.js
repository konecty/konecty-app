import { all } from 'redux-saga/effects';

import stateSampleSaga from './Routes/StateSample/sagas';
import appSaga from './App/sagas';

export default function* rootSaga() {
	yield all([stateSampleSaga(), appSaga()]);
	// code after all-effect
}
