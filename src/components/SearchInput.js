import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeInputSearchValue } from '../actions/actionCreator';

const SearchInput = () => {
  const [searchResults, setSearchResults] = useState([]);
  const SearchInputState = useSelector(state => state.searchInput);
  const CoinListState = useSelector(state => state.coinList);
  const dispatch = useDispatch();

  const handleChange = e => {
    const val = e.target.value;
    dispatch(changeInputSearchValue(val));
    const regex = new RegExp(val, 'i');
    setSearchResults(CoinListState.data.filter(coin => regex.test(coin.name)));
  };

  const displaySearchList = searchResults.map(coin => (
    <li key={coin.symbol}>
      <Link to={`/coin/${coin.symbol}`}>
        <span>{coin.name}</span>
        <span>{coin.symbol}</span>
      </Link>
    </li>
  ));

  return (
    <div className="search-wrapper">
      <input
        type="text"
        onChange={handleChange}
        value={SearchInputState}
        placeholder="Ex: Bitcoin, Tezos"
        autoComplete="off"
      />

      <div className="search-results">
        <ul>
          {SearchInputState !== ' ' && SearchInputState !== '' && displaySearchList}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
