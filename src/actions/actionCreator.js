import axios from 'axios';
import * as actions from './actionTypes';

const key = '060c536a9c9db864';
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
export const getCoinList = (page, curFilter) => async dispatch => {
  try {
    dispatch(requestingData());
    const response = await axios.get(
      `https://coinlib.io/api/v1/coinlist?key=${key}&pref=${curFilter}&page=${page}&order=${order}`,
    );
    dispatch(receivedData(response));
  } catch (e) {
    dispatch(requestingFailed());
  }
};

export const getCoin = (coinSymbol, curFilter) => async dispatch => {
  try {
    dispatch(requestingData());
    const response = await axios.get(
      `https://coinlib.io/api/v1/coin?key=${key}&pref=${curFilter}&symbol=${coinSymbol}`,
    );
    dispatch(receivedUnitData(response, coinSymbol));
  } catch (e) {
    dispatch(requestingFailed());
  }
};

// Filter action
export const changeFilter = value => ({
  type: actions.CHANGE_FILTER,
  payload: {
    value,
  },
});
