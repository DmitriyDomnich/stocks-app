import { Tickers } from 'models/tickers/Tickers';
import { selectChartTickerData } from 'rdx/charts/selectors';
import { getTickerChartData } from 'rdx/charts/thunks';
import { useAppDispatch, useAppSelector } from 'rdx/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const usePageTicker = () => {
  const { ticker } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(selectChartTickerData);

  useEffect(() => {
    dispatch(getTickerChartData(ticker as Tickers, 'yday'));
  }, [dispatch, ticker]);

  return { data, loading, error, ticker };
};
