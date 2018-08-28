export const types = {
  SET_LOCATION: 'SET_LOCATION'
}

const set_location = location => ({
  type: types.SET_LOCATION,
  location
})

export const actions = {
  set_location
}