import { render } from 'react-dom';
import TickerBar from '.';
import { unmountComponentAtNode } from 'react-dom';
import * as router from 'react-router';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
const navigate = jest.fn();

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
const fakeTicker = {
  ticker: 'AAPL',
  exchange: 'NASDAQ',
  price: 279.29,
  change: 64.52,
  change_percent: 0.84,
  dividend: 0.56,
  yield: 1.34,
  last_trade_time: '2021-04-30T11:53:21.000Z',
};

it('should calculate change percent', () => {
  const resultChangePercent = Math.abs(
    ((fakeTicker.price - 200) * 100) / 200
  ).toFixed(2);
  render(<TickerBar ticker={fakeTicker} />, container);
  expect(container.querySelector('#tickerBar').textContent).toMatch(
    new RegExp(resultChangePercent)
  );
});

it('should navigate to a ticker chart', () => {
  const onClick = jest.fn();
  render(<TickerBar onClick={onClick} ticker={fakeTicker} />, container);

  expect(onClick).not.toHaveBeenCalled();

  const tickerBar = container.querySelector('tr');

  tickerBar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(onClick).toHaveBeenCalled();
});
