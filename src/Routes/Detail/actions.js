import { LOAD_DETAILS, LOAD_OPPORTUNITIES, LOAD_TASKS } from './constants';
import { PROP_CHANGE, PROP_MERGE } from '../../App/constants';

export const loadDetails = code => ({
	type: LOAD_DETAILS,
	payload: { code: Number(code) },
});

export const loadTasks = code => ({
	type: LOAD_TASKS,
	payload: { code: Number(code) },
});

export const loadOpportunities = code => ({
	type: LOAD_OPPORTUNITIES,
	payload: { code: Number(code) },
});

/* ============= */

export const contactLoaded = payload => ({
	type: PROP_CHANGE,
	payload: { contact: payload },
});

export const tasksLoaded = payload => ({
	type: PROP_MERGE,
	payload: { contact: { tasks: payload } },
});

export const opportunitiesLoaded = payload => ({
	type: PROP_MERGE,
	payload: { contact: { opportunities: payload } },
});
