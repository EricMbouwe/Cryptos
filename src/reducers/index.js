import { combineReducers } from 'redux';
import cryptoListReducer from './cryptoList';
import filterReducer from './filter';

const rootReducer = combineReducers({
  cryptoList: cryptoListReducer,
  filter: filterReducer,
});

export default rootReducer;
