import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoList } from '../actions/actionCreator';

const CryptoList = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector((state) => state.CryptoList);

  const fetchData = (page) => {
    dispatch(getCryptoList(page));
  };

  useEffect(() => {
    fetchData(1);
  });

  const showData = () => {
    // if (cryptoList.coins.length > 0) {
    //   return <p>have data</p>;
    // }

    // if (cryptoList.loading) {
    //   return <p>loading...</p>;
    // }

    // if (cryptoList.errorMessage !== '') {
    //   return <p>{cryptoList.errorMessage}</p>;
    // }
    console.log(cryptoList);
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
