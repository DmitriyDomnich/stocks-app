import { unmountComponentAtNode } from 'react-dom';
import { screen, render } from '@testing-library/react';
import AddTicker from '.';
import userEvent from '@testing-library/user-event';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const mockTicker = {
  ticker: 'AAPL',
  exchange: 'NASDAQ',
  price: 279.29,
  change: 64.52,
  change_percent: 0.84,
  dividend: 0.56,
  yield: 1.34,
  last_trade_time: '2021-04-30T11:53:21.000Z',
};
jest.mock('rdx/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

it('should render create new group button if groups are empty', async () => {
  render(<AddTicker ticker={mockTicker} groups={[]} />, container);

  const showBtn = screen.getByLabelText('Add the ticker to a watching group');

  userEvent.click(showBtn);

  expect(screen.getByTestId('show-dialog-button').textContent).toBeTruthy();
});
