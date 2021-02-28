import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
  }, [filter, page]);

  const showData = () => {
    const { data } = CoinListState;

    if (CoinListState.fetching) {
      return <p>List Loading...</p>;
    }

    if (CoinListState.message !== '') {
      return <p>{CoinList.message}</p>;
    }

    if (data.length > 0) {
      return (
        <div className="coinList--wrapper">
          {data.map(coin => (
            <Link key={coin.id} to={`coin/${coin.symbol}`}>
              <div className="flex flex-jc-sb flex-ai-c coinList--coin">
                <div className="rank">{coin.rank}</div>
                <div className="details flex flex-jc-c flex-ai-c">
                  <img src={coin.logo_url} alt="" className="img-fluid" />
                  <span>{coin.name}</span>
                  <b>
                    <span>{coin.symbol}</span>
                  </b>
                </div>
                <div className="price">
                  {filter === 'USD' && <span>$ </span>}
                  {filter === 'EUR' && <span>€ </span>}
                  {filter === 'GBP' && <span>£ </span>}
                  {filter === 'XAF' && <span>XAF </span>}
                  {filter === 'JPY' && <span>¥ </span>}
                  {filter === 'CNY' && <span>¥ </span>}
                  {coin.price}
                </div>
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
          pageCount={150}
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
