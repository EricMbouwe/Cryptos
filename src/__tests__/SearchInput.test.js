import React from 'react';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import searchInputReducer from '../reducers/searchInput';
import SearchInput from '../containers/SearchInput';
import CoinList from '../containers/CoinList';

afterEach(cleanup);
beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

function renderWithRedux(
  component,
  { initialState, Store = createStore(searchInputReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={Store}>{component}</Provider>),
  };
}

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = renderWithRedux(
    <SearchInput />,
  );
  expect(queryByTestId('search-results')).toBeTruthy();
  expect(
    queryByPlaceholderText('Search a coin Ex: Bitcoin, Dogecoin'),
  ).toBeTruthy();
});

describe('Input value', () => {
  useSelectorMock.mockReturnValue({ CoinList });

  it('can update on change', () => {
    const { queryByPlaceholderText } = renderWithRedux(<SearchInput />);
    const searchInput = queryByPlaceholderText(
      'Search a coin Ex: Bitcoin, Dogecoin',
    );
    fireEvent.change(searchInput, { target: { value: 'btc' } });
    expect(searchInput.value).toBe('btc');
  });

  it('renders the actual value on change', () => {
    const { queryByPlaceholderText } = renderWithRedux(<SearchInput />);
    const searchInput = queryByPlaceholderText(
      'Search a coin Ex: Bitcoin, Dogecoin',
    );
    fireEvent.change(searchInput, { target: { value: 'dogecoin' } });
    expect(searchInput.value).not.toBe('bitcoin');
  });

  it('can have an initial state', () => {
    const { queryByTestId } = renderWithRedux(<SearchInput />, {
      initialState: 'btc',
    });
    expect(queryByTestId('search')).not.toHaveTextContent('btcc');
  });
});
