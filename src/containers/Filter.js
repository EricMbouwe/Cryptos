import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../actions/actionCreator';

const Filter = () => {
  const dispatch = useDispatch();
  const currencies = ['USD', 'EUR', 'GBP', 'XAF', 'JPY', 'CNY'];

  const handleSelection = e => {
    const selectedValue = e.target.value;
    dispatch(changeFilter(selectedValue));
  };

  return (
    <div className="filter-wrapper">
      <select
        name="currency"
        id="currency"
        onChange={handleSelection}
        className="currencies"
      >
        {currencies.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
