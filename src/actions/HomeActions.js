import { googleApiKey } from 'config';
import axios from 'axios';

import { UPDATE_LOCATION, UPDATE_LOCATIONS, RESET_LOCATION } from 'actions/types';

export const fetchLocations = (location) => {
	return (dispatch) => {
		axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
			params: {
				key: googleApiKey,
				input: location
			}
		})
		.then((result) => {
			let locations = result.data.predictions.map((item) => {
				return item.description;
			});
			dispatch({
				type: UPDATE_LOCATIONS,
				payload: locations
			});
		})
		.catch((error) => {
			alert(error); newLocationData = ''
		});
	}
};

export const updateLocation = (text) => {
	return {
		type: UPDATE_LOCATION,
		payload: text
	};
};

export const resetLocation = (newState = '') => {
  return {
    type: RESET_LOCATION,
    payload: newState
  };
}
