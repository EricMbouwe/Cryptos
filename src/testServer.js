import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(
    'https://api.nomics.com/v1/currencies/ticker',
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            { id: 'BTC', currency: 'BTC', symbol: 'BTC', name: 'Bitcoin' },
            { id: 'ETH', currency: 'ETH', symbol: 'ETH', name: 'Ethereum' },
          ],
        }),
      );
    },
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
