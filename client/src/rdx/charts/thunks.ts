import { Tickers } from 'models/tickers/Tickers';
import { ThunkAppType } from 'rdx/actions';
import { getTickerDataByIntervalAsync, setInterval } from './actions';
import * as TickerService from 'services/tickersService';
import { TickerInterval } from 'services/tickersService';

export const requestAdditionalTickerChartData =
  (newTickers: Tickers[]): ThunkAppType =>
  async (dispatch, getState) => {
    const currTickers = getState().charts.list.data?.map(({ label }) => label);
    if (!currTickers?.length) {
      return;
    }
    const currInterval = getState().charts.interval;

    const tickerToAdd = newTickers.find(
      (newTicker) => !currTickers.includes(newTicker)
    );

    try {
      if (tickerToAdd) {
        dispatch(getTickerDataByIntervalAsync.request());
        const ticker = tickerToAdd as Tickers;
        const tickerResponse = await TickerService.getTickerDataByInterval(
          ticker,
          currInterval
        );
        if (tickerResponse.success && tickerResponse.data) {
          const tickerData = tickerResponse.data;
          const currTickers = getState().charts.list.data!.map(
            ({ data }) => data
          );
          dispatch(
            getTickerDataByIntervalAsync.success([...currTickers, tickerData])
          );
        } else {
          dispatch(
            getTickerDataByIntervalAsync.failure('Something went wrong')
          );
        }
      }
    } catch (err: any) {
      dispatch(getTickerDataByIntervalAsync.failure(err.toString()));
    }
  };

export const getTickerChartDataForDifferentInterval =
  (interval: TickerInterval): ThunkAppType =>
  async (dispatch, getState) => {
    dispatch(setInterval(interval));
    dispatch(getTickerDataByIntervalAsync.request());
    try {
      const currTickers = getState().charts.list.data!.map(
        ({ label }) => label
      );
      const tickersRequests = currTickers.map((currTicker) =>
        TickerService.getTickerDataByInterval(currTicker, interval)
      );
      const tickersResponses = await Promise.all(tickersRequests);
      if (
        tickersResponses.every(
          (tickerResponse) => tickerResponse.success && tickerResponse.data
        )
      ) {
        const tickersData = tickersResponses.map(
          (tickerResponse) => tickerResponse.data!
        );
        dispatch(getTickerDataByIntervalAsync.success(tickersData));
      } else {
        dispatch(getTickerDataByIntervalAsync.failure('Something went wrong'));
      }
    } catch (err: any) {
      dispatch(getTickerDataByIntervalAsync.failure(err.toString()));
    }
  };

export const getTickerChartData =
  (ticker: Tickers): ThunkAppType =>
  async (dispatch, getState) => {
    dispatch(getTickerDataByIntervalAsync.request());
    try {
      const currInterval = getState().charts.interval;
      const tickerResponse = await TickerService.getTickerDataByInterval(
        ticker,
        currInterval
      );
      if (tickerResponse.success && tickerResponse.data) {
        const tickerData = tickerResponse.data;
        dispatch(getTickerDataByIntervalAsync.success([tickerData]));
      } else {
        dispatch(getTickerDataByIntervalAsync.failure('Something went wrong'));
      }
    } catch (err: any) {
      dispatch(getTickerDataByIntervalAsync.failure(err.toString()));
    }
  };
