import axios from 'axios';
import * as actions from './actionTypes';

const key = '060c536a9c9db864';
const pref = 'BTC';
const order = 'rank_asc';

// Requests actions
const requestingData = () => ({ type: actions.REQUESTING_DATA });

const receivedData = res => ({
  type: actions.RECEIVED_DATA,
  payload: {
    list: res.coins,
  },
});

const requestingFailed = () => ({ type: actions.REQUESTING_FAILED });

// Cryptos actions
export const getCryptoList = page => async dispatch => {
  try {
    dispatch(requestingData());
    const res = await axios.get(`https://coinlib.io/api/v1/coinlist?key=${key}&pref=${pref}&page=${page}&order=${order}`);
    dispatch(receivedData(res));
  } catch (e) {
    dispatch(requestingFailed);
  }
};

export function getCryptoLists(page) {
  return async function (dispatch) {
    try {
      dispatch(requestingData());
      const res = await axios.get(`https://coinlib.io/api/v1/coinlist?key=${key}&pref=${pref}&page=${page}&order=${order}`);
      dispatch(receivedData(res));
    } catch (e) {
      dispatch(requestingFailed);
    }
  };
}
