import { takeLatest, put } from 'redux-saga/effects';
import getContact from '../../DAL/getContact';
import getTasks from '../../DAL/getTasks';
import getOpportunities from '../../DAL/getOpportunities';

import { contactLoaded, tasksLoaded, opportunitiesLoaded } from './actions';
import { LOAD_DETAILS, LOAD_OPPORTUNITIES, LOAD_TASKS } from './constants';

function* loadDetails({ payload }) {
	const response = yield getContact(payload.code);
	if (response) {
		yield put(contactLoaded(response[0]));
	} else {
		yield put(contactLoaded({ code: payload.code }));
	}
}

function* loadTasks({ payload }) {
	const response = yield getTasks(payload.code);
	if (response) {
		yield put(tasksLoaded(response));
	}
}

function* loadOpportunities({ payload }) {
	const response = yield getOpportunities(payload.code);
	if (response) {
		yield put(opportunitiesLoaded(response));
	}
}

export default function* () {
	yield takeLatest(LOAD_DETAILS, loadDetails);
	yield takeLatest(LOAD_TASKS, loadTasks);
	yield takeLatest(LOAD_OPPORTUNITIES, loadOpportunities);
}
