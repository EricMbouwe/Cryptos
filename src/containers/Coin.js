import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin, resetInputSearchValue } from '../actions/actionCreator';

const Coin = ({ match }) => {
  const coinSymbol = match.params.coin;

  const dispatch = useDispatch();
  const CoinState = useSelector(state => state.coin);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(getCoin(coinSymbol, filter));
    dispatch(resetInputSearchValue());
  }, [coinSymbol, filter]);

  const showData = () => {
    const coin = CoinState.data[coinSymbol];

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
      const coinName = coin.name.toLowerCase();
      const formatedName = coinName.replace(/\s/g, '-');

      return (
        <div>
          <img
            src={`https://cryptologos.cc/logos/${formatedName}-${coin.symbol.toLowerCase()}-logo.svg?v=010`}
            alt="Coin Logo"
          />
          <span>{coin.name}</span>
          <span>{coin.symbol}</span>
          <span>{coin.price}</span>
        </div>
      );
    }

    return <p>Unable to get data</p>;
  };

  return <div>{showData()}</div>;
};

Coin.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Coin;
