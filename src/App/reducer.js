import { set, mergeDeep, merge } from 'immutable';

import { CONFIG_LOADED, USER_LOADED, PROP_CHANGE, PROP_MERGE } from './constants';

export default (state = {}, { type, payload }) => {
	switch (type) {
		case CONFIG_LOADED:
			return set(state, 'config', payload);
		case USER_LOADED:
			return set(state, 'user', payload);
		case PROP_CHANGE:
			return merge(state, payload);
		case PROP_MERGE:
			return mergeDeep(state, payload);
		default:
			return state;
	}
};
