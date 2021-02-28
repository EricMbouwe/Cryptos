import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin, resetInputSearchValue } from '../actions/actionCreator';
import '../styles/Coin.scss';

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
    const coinDescription = CoinState.desc;

    if (CoinState.fetching) {
      return (
        <div className="container">
          <p>loading...</p>
        </div>
      );
    }

    if (CoinState.message !== '') {
      return <p className="container">{CoinState.message}</p>;
    }

    if (coin && coin.error) {
      return <p className="container">{coin.error}</p>;
    }

    if (coin) {
      return (
        <div className="container">
          <div className="infos flex flex-ai-c">
            <img src={coin.logo_url} alt="" className="img-fluid" />
            <span>{coin.name}</span>
            <span>{coin.symbol}</span>
            <div className="price">
              {filter === 'USD' && <span>$ </span>}
              {filter === 'EUR' && <span>€ </span>}
              {filter === 'GBP' && <span>£ </span>}
              {filter === 'XAF' && <span>XAF </span>}
              {filter === 'JPY' && <span>¥ </span>}
              {filter === 'CNY' && <span>¥ </span>}
              <span>{coin.price}</span>
            </div>
          </div>
          <div className="suppl flex">
            <span>
              height:
              {filter === 'USD' && <span> $ </span>}
              {filter === 'EUR' && <span> € </span>}
              {filter === 'GBP' && <span> £ </span>}
              {filter === 'XAF' && <span> XAF </span>}
              {filter === 'JPY' && <span> ¥ </span>}
              {filter === 'CNY' && <span> ¥ </span>}
              <span className="height">{coin.high}</span>
            </span>
            <span>
              max supply:
              <span className="max-supply">{coin.max_supply}</span>
            </span>
          </div>
          <div className="description">
            <p>{coinDescription}</p>
          </div>
        </div>
      );
    }

    return <p className="container">Unable to get data</p>;
  };

  return <div className="coin">{showData()}</div>;
};

Coin.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Coin;
