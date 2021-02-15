import { combineReducers } from 'redux';
import cryptosReducer from './cryptos';
import filterReducer from './filter';

const rootReducer = combineReducers({
  cryptos : cryptosReducer,
  filter: filterReducer,
});

export default rootReducer;
