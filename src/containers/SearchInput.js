import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeInputSearchValue } from '../actions/actionCreator';

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

  const searchResults = getSearchResults(SearchInputState, CoinListState.data);

  const displaySearchList = searchResults.map(coin => (
    <li key={coin.id}>
      <Link to={`/coin/${coin.symbol}`}>
        <div className="coin-details">
          <img src={coin.logo_url} alt="" className="img-fluid" />
          <span>
            <span>{coin.name}</span>
            <span className="symbol">
              (
              {coin.symbol}
              )
            </span>
          </span>
        </div>
      </Link>
    </li>
  ));

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

      <div>
        <ul data-testid="search-results" className="search-results">
          {SearchInputState !== ' ' && SearchInputState !== '' && displaySearchList}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
