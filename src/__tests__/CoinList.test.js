import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoinList from '../containers/CoinList';

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json({ data: [] }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays the coins list', async () => {
  render(<CoinList url="/" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});

test('handles server error when fetching the coins list', async () => {
  server.use(
    rest.get('/', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<CoinList url="/" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
});