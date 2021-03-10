import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResults = ({ getSearch, input, list }) => {
  const searchResults = getSearch(input, list);

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
    <div>
      <ul data-testid="search-results" className="search-results">
        {input !== ' ' && input !== '' && displaySearchList}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  input: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  getSearch: PropTypes.func.isRequired,
};

export default SearchResults;
