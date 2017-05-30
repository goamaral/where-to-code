import { LOCATION_CHANGED } from '../actions/types';

const INITIAL_STATE = {
	location: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOCATION_CHANGED:
			return { ...state, location: action.payload };
		default:
			return state;
	}
};
