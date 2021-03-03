import React from 'react';
import { NavLink } from 'react-router-dom';
import Filter from '../containers/Filter';
import SearchInput from '../containers/SearchInput';
import '../styles/Header.scss';

const Header = () => (
  <div className="header">
    <nav>
      <div className="container">
        <NavLink className="logo" to="/">
          CRYPTOS
        </NavLink>
      </div>
    </nav>

    <div className="line2">
      <div className="container">
        <h1 className="title">Cryptos Info</h1>
        <div className="searchFilterWrapper">
          <SearchInput />
          <Filter />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
