import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Filter from './Filter';

const Header = () => {
  const [search, setSearch] = useState('');
  const CoinListState = useSelector(state => state.coinList);
  const [searchResults, setSearchResult] = useState([]);

  const handleChange = e => {
    const val = e.target.value;
    setSearch(val);
    const regex = new RegExp(val, 'i');
    setSearchResult(CoinListState.data.filter(coin => regex.test(coin.name)));
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
    <div className="header">
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>

      <div className="search-wrapper">
        <input
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Ex: Bitcoin, Tezos"
          autoComplete="off"
        />

        <div className="search-results">
          <ul>{search !== ' ' && search !== '' && displaySearchList}</ul>
        </div>

        <Filter />
      </div>
    </div>
  );
};

export default Header;
