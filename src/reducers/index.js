import { combineReducers } from 'redux';
import CoinListReducer from './coinList';
import CoinReducer from './coin';
import filterReducer from './filter';

const rootReducer = combineReducers({
  coinList: CoinListReducer,
  coin: CoinReducer,
  filter: filterReducer,
});

export default rootReducer;
