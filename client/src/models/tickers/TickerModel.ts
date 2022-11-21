import { Tickers } from './Tickers';

interface BaseTickerModel {
  ticker: Tickers;
  price: number;
  dividend: number;
  yield: number;
}

export interface TickerModel extends BaseTickerModel {
  exchange: 'NASDAQ';
  last_trade_time: Date;
}
export interface ChartTickerModel extends BaseTickerModel {
  date: number;
}
