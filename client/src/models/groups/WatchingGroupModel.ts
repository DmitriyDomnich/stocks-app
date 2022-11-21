import { Tickers } from 'models/tickers/Tickers';

export interface WatchingGroupModel {
  id: string;
  title: string;
  tickers: Tickers[];
}
