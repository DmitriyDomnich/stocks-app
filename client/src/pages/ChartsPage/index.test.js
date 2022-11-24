import ChartsPage from '.';
import { createRenderer } from 'react-test-renderer/shallow';

const view = createRenderer();
jest.mock('hooks/useChartTicker', () => {
  return {
    usePageTicker: () => {
      return {
        data: null,
        loading: false,
        error: 'Something went wrong',
        ticker: 'APPL',
      };
    },
  };
});

it('should display the error message', () => {
  view.render(<ChartsPage />);
  const { props } = view.getRenderOutput();

  // eslint-disable-next-line testing-library/no-node-access
  expect(props.children[3].props.children).toMatch(/Something went wrong/i);
});
