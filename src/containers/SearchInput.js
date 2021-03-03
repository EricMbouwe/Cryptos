import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeInputSearchValue } from '../actions/actionCreator';

const SearchInput = () => {
  const [searchResults, setSearchResults] = useState([]);
  const SearchInputState = useSelector(state => state.searchInput);
  const fullCoinListState = useSelector(state => state.coinList);
  const dispatch = useDispatch();

  const handleChange = e => {
    const val = e.target.value;
    dispatch(changeInputSearchValue(val));
    const regex = new RegExp(val, 'i');
    setSearchResults(
      fullCoinListState.data.filter(
        coin => regex.test(coin.name) || regex.test(coin.symbol),
      ),
    );
  };

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
        type="text"
        onChange={handleChange}
        value={SearchInputState}
        placeholder="Find a coin Ex: Bitcoin, Tezos"
        autoComplete="off"
      />

      <div>
        <ul className="search-results">
          {SearchInputState !== ' ' && SearchInputState !== '' && displaySearchList}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
