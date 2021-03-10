import { combineReducers } from 'redux';
import CoinListReducer from './coinList';
import CoinReducer from './coin';
import filterReducer from './filter';
import searchInputReducer from './searchInput';
import fullCoinListReducer from './fullCoinList';

const rootReducer = combineReducers({
  fullCoinList: fullCoinListReducer,
  coinList: CoinListReducer,
  coin: CoinReducer,
  filter: filterReducer,
  searchInput: searchInputReducer,
});

export default rootReducer;
