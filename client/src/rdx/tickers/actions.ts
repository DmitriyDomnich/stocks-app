import { TickerModel } from 'models/tickers/TickerModel';
import { createAction } from 'typesafe-actions';

export const setTickers = createAction('SET_TICKERS')<TickerModel[]>();
