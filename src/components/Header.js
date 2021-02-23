import React from 'react';
import { NavLink } from 'react-router-dom';
import Filter from './Filter';
import SearchInput from './SearchInput';

const Header = () => (
  <div className="header">
    <nav>
      <NavLink to="/">Home</NavLink>
    </nav>
    <SearchInput />
    <Filter />
  </div>
);

export default Header;
