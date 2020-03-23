import { update, set } from 'immutable';
import { INCREMENT, FAKE_RESULT } from './constants';

export default (state = { count: 0 }, { type, payload }) => {
	switch (type) {
		case INCREMENT:
			return update(state, 'count', (v = 0) => v + (payload || 0));
		case FAKE_RESULT:
			return set(state, 'post', payload);
		default:
			return state;
	}
};
