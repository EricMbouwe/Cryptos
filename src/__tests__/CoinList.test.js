import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import CoinListReducer from '../reducers/coinList';

import CoinList from '../containers/CoinList';
import { getCoinList } from '../actions/actionCreator';
import { server, rest } from '../testServer';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

const coins = {
  data: [
    {
      id: 'BTC',
      currency: 'BTC',
      symbol: 'BTC',
      name: 'Bitcoin',
    },
    {
      id: 'ETH',
      currency: 'ETH',
      symbol: 'ETH',
      name: 'Ethereum',
    },
  ],
};

function renderWithRedux(
  component,
  { initialState, Store = createStore(CoinListReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={Store}>{component}</Provider>),
  };
}

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

it('fetchs data correctly', async () => {
  const response = await getCoinList('USD', 1);
  expect(response).not.toBeNull;
  expect(response.length).toEqual(1);
});

it('handles failure', async () => {
  server.use(
    rest.get(
      'https://api.nomics.com/v1/currencies/ticker',
      (_req, res, ctx) => {
        return res(ctx.status(404));
      },
    ),
  );

  await expect(getCoinList('USD', 1)).rejects.toBeCalled;
});

it('renders loading state followed by coins', async () => {
  const list = useSelectorMock.mockReturnValue({ coins });

  const component = renderWithRedux(<CoinList />, {
    initialState: list,
  });

  expect(component.find('[data-test-id="loading-coins"]').text()).toBe(
    'Loading…',
  );
  expect(component.find('[data-test-id="coins"]').exists()).toBe(false);
  expect(component.find('[data-test-id="coin-BTC"]').text()).toMatch('Bitcoin');
  expect(component.find('[data-test-id="coin-ETH"]').text()).toMatch(
    'Ethereum',
  );
  expect(component.find('[data-test-id="loading-coins"]').exists()).toBe(false);
});
