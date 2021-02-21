import { combineReducers } from 'redux';
import cryptoListReducer from './cryptoList';
import cryptoReducer from './crypto';
import filterReducer from './filter';

const rootReducer = combineReducers({
  cryptoList: cryptoListReducer,
  crypto: cryptoReducer,
  filter: filterReducer,
});

export default rootReducer;
