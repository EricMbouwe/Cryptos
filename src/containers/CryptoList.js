import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCoinList } from '../actions/actionCreator';

const CryptoList = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector(state => state.cryptoList);

  const fetchData = page => {
    dispatch(getCoinList(page));
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const showData = () => {
    const { coinList } = cryptoList;

    if (cryptoList.fetching) {
      return <p>Loading...</p>;
    }

    if (cryptoList.message !== '') {
      return <p>{cryptoList.message}</p>;
    }

    if (coinList.length > 0) {
      return (
        <div className="list-box">
          {coinList.map(coin => (
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

  return (
    <div>
      <h1>Cryptos List</h1>
      {showData()}
    </div>
  );
};

export default CryptoList;
