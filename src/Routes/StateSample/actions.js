import { INCREMENT, FAKE_SEARCH } from './constants';

export const increment = amount => ({
	type: INCREMENT,
	payload: amount,
});

export const fakeSearch = code => ({
	type: FAKE_SEARCH,
	payload: code,
});
