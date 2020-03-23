import crypto from 'crypto';
import localForage from 'localforage';
import { AUTH_LOGIN } from './constants';
import { USER_LOADED } from '../../App/constants';

export const authLogin = ({ username, pass }) => {
	const passwordSHA256 = crypto.createHash('sha256').update(pass).digest('hex');
	const hashedPass = crypto.createHash('md5').update(pass).digest('hex');
	return {
		type: AUTH_LOGIN,
		payload: {
			username,
			password_SHA256: passwordSHA256,
			password: hashedPass,
		},
	};
};

export const userLogged = ({ authId, ...rest }) => {
	localForage.setItem('token', authId);
	return {
		type: USER_LOADED,
		payload: {
			authId,
			...rest,
		},
	};
};
