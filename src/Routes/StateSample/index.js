/* eslint-disable react/jsx-no-bind */
import React, { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, fakeSearch } from './actions';

const StateSample = () => {
	const dispatch = useDispatch();
	const { count, post } = useSelector(({ sample }) => sample);

	const [postId, setPostId] = useState();
	const incrementHandler = () => dispatch(increment(1));
	const decrementHandler = () => dispatch(increment(-1));
	const doSearch = useCallback(() => dispatch(fakeSearch(postId)), [dispatch, postId]);

	return (
		<>
			<h1>Hello from State</h1>
			<p>Count: {count}</p>
			<button type="button" onClick={incrementHandler}>
				Increment
			</button>
			<button type="button" onClick={decrementHandler}>
				Decrement
			</button>
			<br />
			Post Id:
			<input
				type="number"
				id="postId"
				name="postId"
				value={postId || ''}
				onChange={({ target: { value } }) => setPostId(value)}
			/>
			<button type="button" onClick={doSearch}>
				Buscar
			</button>
			{post && <pre>{JSON.stringify(post)}</pre>}
		</>
	);
};

export default StateSample;
