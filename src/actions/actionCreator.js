import axios from 'axios';
import * as actions from './actionTypes';

const key = '75148c0f430a70d9116c78b9c9431efe';
const perPage = 20;
const data = {
  headers: {
    Accept: 'Application/json',
    'Content-Type': 'application/json',
    Origin: 'http://react-cryptos.herokuapp.com/',
  },
};

// Requests actions!
const requestingData = () => ({ type: actions.REQUESTING_DATA });
const requestingFailed = () => ({ type: actions.REQUESTING_FAILED });

const receivedData = response => ({
  type: actions.RECEIVED_DATA,
  payload: response.data,
});

const receivedALLData = response => ({
  type: actions.RECEIVED_ALL_DATA,
  payload: response.data,
});

const receivedUnitData = (res1, res2, symbol, filter) => ({
  type: actions.RECEIVED_UNIT_DATA,
  payload: res1.data,
  desc: res2.data,
  coinSymbol: symbol,
  curfilter: filter,
});

// Cryptos actions
export const getAllCoins = () => async dispatch => {
  try {
    dispatch(requestingData());
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${key}`,
      data,
    );
    dispatch(receivedALLData(response));
  } catch (e) {
    dispatch(requestingFailed());
  }
};

export const getCoinList = (curFilter, page) => async dispatch => {
  try {
    dispatch(requestingData());
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${key}&interval=1d,30d&convert=${curFilter}&per-page=${perPage}&page=${page}`,
      data,
    );
    dispatch(receivedData(response));
  } catch (e) {
    dispatch(requestingFailed());
  }
};

export const getCoin = (coinSymbol, curFilter) => async dispatch => {
  try {
    dispatch(requestingData());
    const response1 = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${coinSymbol}&interval=1d,30d&convert=${curFilter}`,
      data,
    );
    const response2 = await axios.get(
      `https://api.nomics.com/v1/currencies?key=${key}&ids=${coinSymbol}&attributes=description`,
      data,
    );
    dispatch(receivedUnitData(response1, response2, coinSymbol, curFilter));
  } catch (e) {
    dispatch(requestingFailed());
  }
};

// Filter action
export const changeFilter = value => ({
  type: actions.CHANGE_FILTER,
  payload: value,
});

// Search Input action
export const changeInputSearchValue = value => ({
  type: actions.CHANGE_SEARCH_INPUT,
  payload: value,
});

export const resetInputSearchValue = () => ({
  type: actions.RESET_SEARCH_INPUT,
  payload: '',
});
