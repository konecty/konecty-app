import { combineReducers } from 'redux';

import stateSampleReducer from './Routes/StateSample/reducer';
import appReducer from './App/reducer';

export default combineReducers({
	app: appReducer,
	sample: stateSampleReducer,
});
