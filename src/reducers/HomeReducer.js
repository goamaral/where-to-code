import { LOCATION_DATA_CHANGED, LOCATION_CHANGED } from '../actions/types';

const INITIAL_STATE = {
	locationData: ['Viseu', 'Portugal', 'Porto', 'Espanha', 'Lisboa', 'Coimbra', 'Madrid', 'Vila Real', 'Braga', 'Braganca'],
  location: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOCATION_CHANGED:
			return { ...state, location: action.payload };
    case LOCATION_DATA_CHANGED:
			return { ...state, locationData: action.payload };
		default:
			return state;
	}
};
