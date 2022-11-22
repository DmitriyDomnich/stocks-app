import { ChartTickerModel } from 'models/tickers/TickerModel';
import { Tickers } from 'models/tickers/Tickers';
import { TickerInterval } from 'services/tickersService';
import { createAction, createAsyncAction } from 'typesafe-actions';

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
)<undefined, ChartTickerModel[][], string>();
export const clearCharts = createAction('CLEAR_CHARTS')<void>();
export const setInterval = createAction('SET_INTERVAL')<TickerInterval>();
export const setField = createAction('SET_FIELD')<keyof ChartTickerModel>();
export const removeChartData = createAction('REMOVE_CHART_DATA')<Tickers>();
