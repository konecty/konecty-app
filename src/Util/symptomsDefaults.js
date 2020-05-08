export default function symptomsDefaults(opportunity) {
	const markNullAsFalse = obj => {
		if (!obj) return null;

		const keys = Object.keys(obj);
		const marked = keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] || false }), {});

		return marked;
	};

	const op = {
		symptomIndicators: markNullAsFalse(opportunity.symptomIndicators),
		healthProblemsIndicators: markNullAsFalse(opportunity.healthProblemsIndicators),
	};

	return op;
}
