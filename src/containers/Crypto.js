import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin } from '../actions/actionCreator';

const Crypto = ({ match }) => {
  const coinName = match.params.coin;

  const dispatch = useDispatch();
  const cryptoUnit = useSelector(state => state.crypto);

  useEffect(() => {
    dispatch(getCoin(coinName));
  }, []);

  const showData = () => {
    const coin = cryptoUnit.data[coinName];

    if (cryptoUnit.fetching) {
      return <p>loading...</p>;
    }

    if (cryptoUnit.message !== '') {
      return <p>{cryptoUnit.message}</p>;
    }

    if (coin && coin.error) {
      return <p>{coin.error}</p>;
    }

    if (coin) {
      console.log('CryptoUnit ', cryptoUnit);
      return (
        <div>
          <p>{coin.name}</p>
          <img src={coin.show_symbol} alt="" />
          <p>{coin.symbol}</p>
          <p>
            {coin.price}
            <span>
              <b>$</b>
            </span>
          </p>
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  return (
    <div>
      <h1>COIN</h1>
      {showData()}
    </div>
  );
};

Crypto.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

// match: PropTypes.objectOf(PropTypes.any).isRequired,
// match: PropTypes.shape({}).isRequired,
export default Crypto;
