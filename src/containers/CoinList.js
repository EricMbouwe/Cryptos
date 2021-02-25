import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getCoinList, resetInputSearchValue } from '../actions/actionCreator';
import '../styles/CoinList.scss';

const CoinList = () => {
  const dispatch = useDispatch();
  const CoinListState = useSelector(state => state.coinList);
  const filter = useSelector(state => state.filter);

  const fetchData = (filter, page = 1) => {
    dispatch(getCoinList(filter, page));
    dispatch(resetInputSearchValue());
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

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
          {data.map(coin => {
            const coinName = coin.name.toLowerCase();
            const formatedName = coinName.replace(/\s/g, '-');

            return (
              <div
                key={coin.symbol}
                className="flex flex-jc-sb flex-ai-c coinList--coin"
              >
                <div className="rank">{coin.rank}</div>
                <div className="details">
                  <img
                    src={`https://cryptologos.cc/logos/${formatedName}-${coin.symbol.toLowerCase()}-logo.png?v=010`}
                    alt=""
                    className="img-fluid"
                  />
                  <span>{coin.name}</span>
                  <b>
                    <span>{coin.symbol}</span>
                  </b>
                </div>
                <div className="price">{coin.price}</div>
                <Link to={`coin/${coin.symbol}`}>Open</Link>
              </div>
            );
          })}
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
          pageCount={64}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={data => fetchData(filter, data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default CoinList;
