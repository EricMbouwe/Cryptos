import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin } from '../actions/actionCreator';

const Coin = ({ match }) => {
  const coinName = match.params.coin;

  const dispatch = useDispatch();
  const CoinState = useSelector(state => state.coin);

  useEffect(() => {
    dispatch(getCoin(coinName));
  }, []);

  const showData = () => {
    const coin = CoinState.data[coinName];

    if (CoinState.fetching) {
      return <p>loading...</p>;
    }

    if (CoinState.message !== '') {
      return <p>{CoinState.message}</p>;
    }

    if (coin && coin.error) {
      return <p>{coin.error}</p>;
    }

    if (coin) {
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

Coin.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

// match: PropTypes.objectOf(PropTypes.any).isRequired,
// match: PropTypes.shape({}).isRequired,
export default Coin;
