import * as actions from '../actions/actionTypes';

const defaultState = {
  fetching: false,
  data: {},
  desc: '',
  message: '',
  log: '',
};

const CoinReducer = (state = defaultState, action) => {
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
        message: 'Sorry unable to get coin infos, retry!',
        log: 'fetching failed!',
      };
    case actions.RECEIVED_UNIT_DATA:
      return {
        ...state,
        fetching: false,
        data: {
          ...state.data,
          [action.coinSymbol]: action.payload[0],
        },
        desc: action.desc[0].description,
        log: 'Succes, data received!',
      };
    default:
      return state;
  }
};

export default CoinReducer;
