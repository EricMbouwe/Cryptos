import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  queryByPlaceholderText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import searchInputReducer from '../reducers/searchInput';
import SearchInput from '../containers/SearchInput';

afterEach(cleanup);

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
  it('can update on change', () => {
    const { queryByPlaceholderText } = renderWithRedux(<SearchInput />);
    const searchInput = queryByPlaceholderText('Search a coin Ex: Bitcoin, Dogecoin');
    fireEvent.change(searchInput, { target: { value: 'btc' } });
    expect(searchInput.value).toBe('btc');
  });

  it('can have an initial state', () => {
    // const { queryByPlaceholderText } = renderWithRedux(<SearchInput />, {
    //   initialState: 'btc',
    // });
    // expect(queryByPlaceholderText).toHaveTextContent('btc');
  });
});
