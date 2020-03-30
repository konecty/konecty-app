import { takeLatest, put } from 'redux-saga/effects';
import login from '../../DAL/mutations/login';

import { userLogged } from './actions';
import { AUTH_LOGIN } from './constants';

function* authLogin({ payload }) {
	const { success, logged, user, authId } = yield login(payload);
	if (success && logged) {
		yield put(
			userLogged({
				logged: true,
				data: user,
				authId,
			}),
		);
	}
}

export default function* () {
	yield takeLatest(AUTH_LOGIN, authLogin);
}
