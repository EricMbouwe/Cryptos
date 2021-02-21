import axios from 'axios';
import * as actions from './actionTypes';

const key = '060c536a9c9db864';
const pref = 'USD';
const order = 'rank_asc';

// Requests actions!
const requestingData = () => ({ type: actions.REQUESTING_DATA });
const requestingFailed = () => ({ type: actions.REQUESTING_FAILED });

const receivedData = response => ({
  type: actions.RECEIVED_DATA,
  payload: response.data,
});

const receivedUnitData = (response, symbol) => ({
  type: actions.RECEIVED_UNIT_DATA,
  payload: response.data,
  coinSymbol: symbol,
});

// Cryptos actions
export const getCoinList = page => async dispatch => {
  try {
    dispatch(requestingData());
    const response = await axios.get(
      `https://coinlib.io/api/v1/coinlist?key=${key}&pref=${pref}&page=${page}&order=${order}`,
    );
    dispatch(receivedData(response));
  } catch (e) {
    dispatch(requestingFailed());
    console.log(e.message);
  }
};

export function getCoin(coinSymbol) {
  return async function (dispatch) {
    try {
      dispatch(requestingData());
      const response = await axios.get(
        `https://coinlib.io/api/v1/coin?key=${key}&pref=${pref}&symbol=${coinSymbol}`,
      );
      dispatch(receivedUnitData(response, coinSymbol));
    } catch (e) {
      dispatch(requestingFailed());
      console.log(e.message);
    }
  };
}
