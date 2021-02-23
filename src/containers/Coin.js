import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin } from '../actions/actionCreator';

const Coin = ({ match }) => {
  const coinName = match.params.coin;

  const dispatch = useDispatch();
  const CoinState = useSelector(state => state.coin);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(getCoin(coinName, filter));
  }, [coinName, filter]);

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
          <span>{coin.name}</span>
          <span>{coin.symbol}</span>
          <span>{coin.price}</span>
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  return (
    <div>
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
