import * as actions from '../actions/actionTypes';

const defaultState = {
  fetching: false,
  cryptoList: [],
  errorMessage: '',
};

const cryptoListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.REQUESTING_DATA:
      return {
        ...state,
        fetching: true,
        errorMessage: '',
      };
    case actions.REQUESTING_FAILED:
      return {
        ...state,
        fetching: false,
        errorMessage: 'Sorry something went wrong, retry!',
      };
    case actions.RECEIVED_DATA:
      return {
        ...state,
        fetching: false,
        cryptoList: action.payload.list,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default cryptoListReducer;
