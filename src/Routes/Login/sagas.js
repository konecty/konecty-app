import { takeLatest, put } from 'redux-saga/effects';
import { post } from '../../DAL/api';

import { userLogged } from './actions';
import { AUTH_LOGIN } from './constants';

function* authLogin({ payload }) {
	const { data } = yield post('/rest/auth/login', payload);
	if (data.success && data.logged) {
		yield put(
			userLogged({
				logged: true,
				data: data.user,
				authId: data.authId,
			}),
		);
	}
}

export default function* () {
	yield takeLatest(AUTH_LOGIN, authLogin);
}
