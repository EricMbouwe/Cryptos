import { combineReducers } from 'redux';
import CoinListReducer from './coinList';
import CoinReducer from './coin';
import filterReducer from './filter';
import searchInputReducer from './searchInput';

const rootReducer = combineReducers({
  coinList: CoinListReducer,
  coin: CoinReducer,
  filter: filterReducer,
  searchInput: searchInputReducer,
});

export default rootReducer;
