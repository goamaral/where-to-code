import { UPDATE_LOCATIONS, UPDATE_LOCATION, RESET_LOCATION } from 'actions/types';

const INITIAL_STATE = {
  location: '',
  locations: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_LOCATION:
			return { ...state, location: action.payload };
		case UPDATE_LOCATIONS:
			return { ...state, locations: action.payload};
		case RESET_LOCATION:
			return { ...state, location: action.payload }
		default:
			return state;
	}
};
