import { combineReducers } from 'redux'
import { types } from './actions'

const INITIAL_STATE = {
  location: ''
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return { ...state, location: action.location }

    default:
      return state
  }
}

export default combineReducers({ reducer });
