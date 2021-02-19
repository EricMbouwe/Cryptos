import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCryptoList } from '../actions/actionCreator';

const CryptoList = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector(state => state.cryptoList);

  const fetchData = page => {
    dispatch(getCryptoList(page));
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const showData = () => {
    const list = cryptoList.coinList;

    if (list.length > 0) {
      return (
        <div className="list-wrapper">
          {list.map(coin => (
            <div key={coin.symbol} className="flex flex-jc-sb flex-ai-c">
              <div>{coin.name}</div>
              <div>
                {coin.price}
                <b><span>$</span></b>
              </div>
              <Link to={`crypto/${coin.name}`}>Open</Link>
            </div>
          ))}
        </div>
      );
    }

    if (cryptoList.loading) {
      return <p>loading...</p>;
    }

    if (cryptoList.errorMessage !== '') {
      return <p>{cryptoList.errorMessage}</p>;
    }
    return <p>unable to get data</p>;
  };

  return (
    <div>
      <h1>Cryptos List</h1>
      {showData()}
    </div>
  );
};

export default CryptoList;
