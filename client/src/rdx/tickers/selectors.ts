import { Tickers } from 'models/tickers/Tickers';
import { RootState } from 'rdx/store';

export const selectAllTickers = ({ tickers }: RootState) => tickers.list;
export const selectTickersByTickerNames =
  (tickerNames: Tickers[]) =>
  ({ tickers }: RootState) =>
    tickers.list.filter((ticker) => tickerNames.includes(ticker.ticker));
