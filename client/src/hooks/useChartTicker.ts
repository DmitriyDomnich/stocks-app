import { Tickers } from 'models/tickers/Tickers';
import { selectChartTickerData } from 'rdx/charts/selectors';
import {
  getTickerChartData,
  requestAdditionalTickerChartData,
} from 'rdx/charts/thunks';
import { useAppDispatch, useAppSelector } from 'rdx/hooks';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const usePageTicker = () => {
  const { ticker } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(selectChartTickerData);

  useEffect(() => {
    const addionalTickers = searchParams.getAll('compareTo') as Tickers[];

    if (addionalTickers.length) {
      dispatch(requestAdditionalTickerChartData(addionalTickers));
    }
  }, [searchParams, dispatch, data]);

  useEffect(() => {
    dispatch(getTickerChartData(ticker as Tickers));
  }, [dispatch, ticker]);

  return { data, loading, error, ticker };
};
