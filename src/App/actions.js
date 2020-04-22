import { LOAD_CONFIG, CONFIG_LOADED, LOAD_USER, USER_LOADED } from './constants';

export const loadConfig = payload => ({
	type: LOAD_CONFIG,
	payload,
});

export const configLoaded = payload => ({
	type: CONFIG_LOADED,
	payload,
});

export const loadUser = payload => ({
	type: LOAD_USER,
	payload,
});

export const userLoaded = payload => ({
	type: USER_LOADED,
	payload,
});
