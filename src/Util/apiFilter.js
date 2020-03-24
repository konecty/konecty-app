const addFilter = (opts = {}, ...filters) => {
	const obj = {
		...opts,
		params: opts.params || {},
	};

	obj.params.filter = {
		match: 'and',
		conditions: filters,
	};

	return obj;
};

export default addFilter;
