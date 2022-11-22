import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { useTickersToCompare } from 'hooks/useTickersToCompare';
import CircularProgress from '@mui/material/CircularProgress';
import TickerCard from 'components/TickerCard';
import { Tickers } from 'models/tickers/Tickers';
import { useAppDispatch } from 'rdx/hooks';
import { removeChartData } from 'rdx/charts/actions';

const ChartComparisons = () => {
  const { data: tickers, loading, error } = useTickersToCompare();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleTickerCardClick = useCallback(
    ({ ticker }: ChartTickerModel) => {
      const presentTickers = searchParams.getAll('compareTo');
      const isTickerPresent = presentTickers.find(
        (presentTicker) => presentTicker === ticker
      );
      if (!isTickerPresent) {
        setSearchParams((prev) => {
          prev.append('compareTo', ticker);
          return prev;
        });
      }
    },
    [searchParams, setSearchParams]
  );
  const handleTickerRemove = useCallback(
    (tickerToRemove: Tickers) =>
      setSearchParams((prev) => {
        const prevTickers = prev.getAll('compareTo');
        prev.delete('compareTo');
        prevTickers.forEach(
          (ticker) =>
            ticker !== tickerToRemove && prev.append('compareTo', ticker)
        );
        dispatch(removeChartData(tickerToRemove));
        return prev;
      }),
    [setSearchParams, dispatch]
  );

  return (
    <div>
      <div className='pl-2 text-3xl'>Compare to</div>
      {!error ? (
        <>
          {!loading && tickers ? (
            <div>
              {tickers.length ? (
                <div className='flex flex-wrap space-x-2 space-y-2'>
                  {tickers.map((ticker) => (
                    <TickerCard
                      key={ticker.ticker}
                      onRemove={handleTickerRemove}
                      onClick={handleTickerCardClick}
                      ticker={ticker}
                    />
                  ))}
                </div>
              ) : (
                <div>Error while loading tickers</div>
              )}
            </div>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <div>Error occured</div>
      )}
    </div>
  );
};

export default ChartComparisons;
