import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getCoinList } from '../actions/actionCreator';

const CoinList = ({ history }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResult] = useState([]);

  const dispatch = useDispatch();
  const CoinListState = useSelector(state => state.coinList);

  const fetchData = page => {
    dispatch(getCoinList(page));
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const showData = () => {
    const { data } = CoinListState;

    if (CoinListState.fetching) {
      return <p>Loading...</p>;
    }

    if (CoinListState.message !== '') {
      return <p>{CoinList.message}</p>;
    }

    if (data.length > 0) {
      return (
        <div className="list-box">
          {data.map(coin => (
            <div key={coin.symbol} className="flex flex-jc-sb flex-ai-c">
              <div>{coin.name}</div>
              <div>
                {coin.price}
                <b>
                  <span>$</span>
                </b>
              </div>
              <Link to={`coin/${coin.symbol}`}>Open</Link>
            </div>
          ))}
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  const handleChange = e => {
    const val = e.target.value;
    setSearch(val);
    const regex = new RegExp(val, 'i');
    setSearchResult(CoinListState.data.filter(coin => regex.test(coin.name)));
    // setSearchResult(
    //   CoinListState.data.filter(coin => coin.name.toLowerCase().includes(val.toLowerCase())),
    // );
  };

  const resultsList = searchResults.map(coin => (
    <li key={coin.symbol}>
      <Link to={`/coin/${coin.symbol}`}>
        {coin.name}
        {coin.symbol}
      </Link>
    </li>
  ));

  return (
    <div>
      <h1>Coin List</h1>
      <div className="search-wrapper">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ex: Bitcoin, Tezos"
          autoComplete="off"
        />
        <button type="button" onClick={() => history.push(`/coin/${search}`)}>
          search
        </button>
        <div className="search-results">
          <ul>{resultsList}</ul>
        </div>
      </div>
      {showData()}
      {CoinListState.data.length > 0 && (
        <ReactPaginate
          pageCount={44}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={data => fetchData(data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

CoinList.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CoinList;
