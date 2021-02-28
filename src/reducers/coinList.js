import * as actions from '../actions/actionTypes';

const defaultState = {
  fetching: false,
  data: [],
  message: '',
  log: '',
};

const CoinListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.REQUESTING_DATA:
      return {
        ...state,
        fetching: true,
        log: 'Fetching data...',
      };
    case actions.REQUESTING_FAILED:
      return {
        ...state,
        fetching: false,
        message: 'Sorry, unable to find data, retry!',
        log: 'fetching failed!',
      };
    case actions.RECEIVED_DATA:
      return {
        ...state,
        fetching: false,
        data: action.payload,
        log: 'Succes, data received!',
      };
    default:
      return state;
  }
};

export default CoinListReducer;
