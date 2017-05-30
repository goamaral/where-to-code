import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import InputValueReducer from './InputValueReducer';

export default combineReducers({
	data: DataReducer,
	inputValues: InputValueReducer
});
