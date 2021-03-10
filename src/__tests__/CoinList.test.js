import '@testing-library/jest-dom/extend-expect';

import { getCoinList } from '../actions/actionCreator';
import { server, rest } from '../testServer';

it('fetchs data correctly', async () => {
  const response = await getCoinList('USD', 1);
  expect(response.length).toEqual(1);
});

it('handles failure', async () => {
  server.use(
    rest.get(
      'https://api.nomics.com/v1/currencies/ticker',
      (_req, res, ctx) => res(ctx.status(404)),
    ),
  );

  await expect(getCoinList('USD', 1)).rejects.toBeCalled;
});
