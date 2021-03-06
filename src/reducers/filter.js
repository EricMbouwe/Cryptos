import * as actions from '../actions/actionTypes';

const filterReducer = (state = 'USD', action) => {
  switch (action.type) {
    case actions.CHANGE_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
