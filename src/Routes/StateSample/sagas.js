import { takeLatest, put } from 'redux-saga/effects';

import axios from 'axios';

import { FAKE_SEARCH, FAKE_RESULT } from './constants';

function* fakeCall({ payload }) {
	const { data } = yield axios.get(`https://my-json-server.typicode.com/typicode/demo/posts/${payload}`);
	yield put({ type: FAKE_RESULT, payload: data });
}

export default function* StateSampleSagas() {
	yield takeLatest(FAKE_SEARCH, fakeCall);
}
