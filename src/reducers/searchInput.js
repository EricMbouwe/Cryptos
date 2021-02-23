import * as actions from '../actions/actionTypes';

const searchInputReducer = (state = '', action) => {
  switch (action.type) {
    case actions.CHANGE_SEARCH_INPUT:
      return action.payload.value;
    case actions.RESET_SEARCH_INPUT:
      return action.payload;
    default:
      return state;
  }
};

export default searchInputReducer;
