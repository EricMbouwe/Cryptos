import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';
import { getCoinList, resetInputSearchValue } from '../actions/actionCreator';
import '../styles/CoinList.scss';

const CoinList = () => {
  const dispatch = useDispatch();
  const CoinListState = useSelector(state => state.coinList);
  const filter = useSelector(state => state.filter);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    dispatch(getCoinList(filter, page));
    dispatch(resetInputSearchValue());
  };

  useEffect(() => {
    fetchData();
    console.log('LIST', CoinListState);
  }, [filter, page]);

  const showData = () => {
    const { data } = CoinListState;

    if (CoinListState.fetching) {
      return (
        <div className="coinList--spiner flex flex-jc-c flex-ai-c">
          <Loader type="Grid" color="#121d33" height={100} width={100} />
          <p>Loading List</p>
        </div>
      );
    }

    if (CoinListState.message !== '') {
      return <p>{CoinList.message}</p>;
    }

    if (data.length > 0) {
      return (
        <div className="coinList--wrapper">
          <div className="titles">
            <h4>Rank</h4>
            <h4>Name</h4>
            <h4>Price</h4>
            <h4>Market cap</h4>
            <h4>Change (24h)</h4>
          </div>
          {data.map(coin => (
            <Link
              key={coin.id}
              to={`coin/${coin.symbol}`}
              className="coinList--row"
            >
              <div className="rank flex flex-ai-c">{coin.rank}</div>
              <div className="details flex flex-ai-c">
                <img src={coin.logo_url} alt="" className="img-fluid" />
                <span>{coin.name}</span>
                <span>{coin.symbol}</span>
              </div>
              <div className="price flex flex-ai-c">
                {filter === 'USD' && <span>$ </span>}
                {filter === 'EUR' && <span>€ </span>}
                {filter === 'GBP' && <span>£ </span>}
                {filter === 'XAF' && <span>XAF </span>}
                {filter === 'JPY' && <span>¥ </span>}
                {filter === 'CNY' && <span>¥ </span>}
                <span>{coin.price}</span>
              </div>
              <div className="market-cap flex flex-ai-c">
                {filter === 'USD' && <span>$ </span>}
                {filter === 'EUR' && <span>€ </span>}
                {filter === 'GBP' && <span>£ </span>}
                {filter === 'XAF' && <span>XAF </span>}
                {filter === 'JPY' && <span>¥ </span>}
                {filter === 'CNY' && <span>¥ </span>}
                <span>{coin.market_cap}</span>
              </div>
              <div className="change flex flex-ai-c">
                {coin['1d']?.price_change_pct}
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  return (
    <div className="coinList container">
      <h1 className="coinList--title">Best Prices</h1>
      {showData()}
      {CoinListState.data.length > 0 && (
        <ReactPaginate
          pageCount={200}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={data => setPage(data.selected + 1)}
          containerClassName="coinList--pagination"
        />
      )}
    </div>
  );
};

export default CoinList;
