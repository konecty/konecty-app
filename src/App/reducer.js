import { set } from 'immutable';

import { CONFIG_LOADED, USER_LOADED } from './constants';

export default (state = {}, { type, payload }) => {
	switch (type) {
		case CONFIG_LOADED:
			return set(state, 'config', payload);
		case USER_LOADED:
			return set(state, 'user', payload);
		default:
			return state;
	}
};
