import { Tickers } from 'models/tickers/Tickers';
import { ThunkAppType } from 'rdx/actions';
import { getTickerDataByIntervalAsync } from './actions';
import * as TickerService from 'services/tickersService';
import { TickerInterval } from 'services/tickersService';

export const getTickerChartData =
  (ticker: Tickers, interval: TickerInterval): ThunkAppType =>
  async (dispatch, getState) => {
    const prevChartTickers = getState().charts.list.data;
    if (prevChartTickers?.find((prevTicker) => prevTicker.label === ticker))
      return;
    dispatch(getTickerDataByIntervalAsync.request());

    try {
      const tickersResponse = await TickerService.getTickerDataByInterval(
        ticker,
        interval
      );
      if (tickersResponse.success && tickersResponse.response?.length) {
        dispatch(
          getTickerDataByIntervalAsync.success(tickersResponse.response)
        );
      } else {
        dispatch(getTickerDataByIntervalAsync.failure(tickersResponse.error!));
      }
    } catch (err: any) {
      dispatch(getTickerDataByIntervalAsync.failure(err.toString()));
    }
  };
