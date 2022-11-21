import { ChartTickerModel } from 'models/tickers/TickerModel';
import { createAsyncAction } from 'typesafe-actions';

const GET_TICKER_DATA_BY_INTERVAL_START =
  '@charts/GET_TICKER_DATA_BY_INTERVAL_START';
const GET_TICKER_DATA_BY_INTERVAL_SUCCESS =
  '@charts/GET_TICKER_DATA_BY_INTERVAL_SUCCESS';
const GET_TICKER_DATA_BY_INTERVAL_FAILED =
  '@charts/GET_TICKER_DATA_BY_INTERVAL_FAILED';

export const getTickerDataByIntervalAsync = createAsyncAction(
  GET_TICKER_DATA_BY_INTERVAL_START,
  GET_TICKER_DATA_BY_INTERVAL_SUCCESS,
  GET_TICKER_DATA_BY_INTERVAL_FAILED
)<undefined, ChartTickerModel[], string>();
