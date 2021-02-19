import * as actions from '../actions/actionTypes';

const defaultState = {
  fetching: false,
  coinList: [],
  message: '',
  remaining: 0,
};

const cryptoListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.REQUESTING_DATA:
      return {
        ...state,
        fetching: true,
        message: 'Fetching data...',
      };
    case actions.REQUESTING_FAILED:
      return {
        ...state,
        fetching: false,
        message: 'Sorry something went wrong, retry!',
      };
    case actions.RECEIVED_DATA:
      return {
        ...state,
        fetching: false,
        coinList: action.payload.coins,
        message: 'Succes, data received!',
        remaining: action.payload.remaining,
      };
    default:
      return state;
  }
};

export default cryptoListReducer;
