import { LOCATION_DATA_CHANGED } from '../actions/types';

const INITIAL_STATE = {
	locationData: ['Viseu', 'Portugal', 'Porto', 'Espanha', 'Lisboa', 'Coimbra', 'Madrid', 'Vila Real', 'Braga', 'Braganca']
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOCATION_DATA_CHANGED:
			return { ...state, data: action.payload };
		default:
			return state;
	}
};
