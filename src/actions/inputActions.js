export const updateInput = (text, type) => {
	return {
		type: type,
		payload: text
	};
};

export const resetInput = (newState = '', type) => {
  return {
    type: type,
    payload: newState
  };
}
