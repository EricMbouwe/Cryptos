import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getCoinList, resetInputSearchValue } from '../actions/actionCreator';

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
        <div className="list-wrapper">
          {data.map(coin => (
            <div key={coin.symbol} className="flex flex-jc-sb flex-ai-c">
              <div>{coin.rank}</div>
              <div>
                <span>{coin.name}</span>
                <span>{coin.symbol}</span>
              </div>
              <div>{coin.price}</div>
              <Link to={`coin/${coin.symbol}`}>Open</Link>
            </div>
          ))}
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  return (
    <div>
      <h1>Best Prices</h1>

      {showData()}
      {CoinListState.data.length > 0 && (
        <ReactPaginate
          pageCount={44}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={data => fetchData(filter, data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default CoinList;
