import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputSearchValue } from '../actions/actionCreator';
import SearchResults from '../components/SearchResults';

const SearchInput = () => {
  const SearchInputState = useSelector(state => state.searchInput);
  const CoinListState = useSelector(state => state.coinList);
  const dispatch = useDispatch();

  const handleChange = e => {
    const val = e.target.value;
    dispatch(changeInputSearchValue(val));
  };

  const getSearchResults = (input, list) => {
    const regex = new RegExp(input, 'i');
    return list.filter(
      coin => regex.test(coin.name) || regex.test(coin.symbol),
    );
  };

  return (
    <div className="search-wrapper">
      <input
        data-testid="search"
        type="text"
        onChange={handleChange}
        value={SearchInputState}
        placeholder="Search a coin   Ex: Bitcoin, Dogecoin"
        autoComplete="off"
      />
      <SearchResults
        getSearch={getSearchResults}
        input={SearchInputState}
        list={CoinListState.data}
      />
    </div>
  );
};

export default SearchInput;
