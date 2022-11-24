import React, { useMemo } from 'react';
import { Breadcrumbs, CircularProgress } from '@mui/material';
import { usePageTicker } from 'hooks/useChartTicker';
import { Link } from 'react-router-dom';
import TickerChart from 'components/TickerChart';
import { tickerToTickerName } from 'utils/tickers';
import { Tickers } from 'models/tickers/Tickers';
import ChartInfo from 'components/TickerChart/ChartInfo';
import ChartSettings from 'components/TickerChart/ChartSettings';
import ChartComparisons from 'components/TickerChart/ChartComparisons';
import { tickerColorsMap } from 'utils/colors';

const ChartsPage = () => {
  const { data, loading, error, ticker } = usePageTicker();

  const tickerName = useMemo(
    () => tickerToTickerName(ticker as Tickers),
    [ticker]
  );

  const selectedTickerData = useMemo(
    () => data?.find((series) => series.label === ticker)?.data,
    [data, ticker]
  );

  return (
    <div className='p-2 md:p-3'>
      <Breadcrumbs>
        <Link className='hover:underline' to='/'>
          Home
        </Link>
        <span className='font-medium'>{ticker}</span>
      </Breadcrumbs>
      <h2 className='text-2xl font-medium my-2'>
        <span
          style={{ borderBottomColor: tickerColorsMap[ticker as Tickers] }}
          className='border-b-2'
        >
          {tickerName}
        </span>
      </h2>
      <hr />
      {!error ? (
        <>
          <div>
            {selectedTickerData && (
              <ChartInfo tickerData={selectedTickerData} />
            )}
            {!loading && data ? (
              <>
                {data?.length ? (
                  <div>
                    <div className='flex flex-wrap space-x-4'>
                      <TickerChart data={data} />
                      <div className='flex flex-col space-y-2 flex-grow'>
                        <ChartSettings />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>Something went wrong</div>
                )}
              </>
            ) : (
              <CircularProgress className='my-5' />
            )}
          </div>
          <ChartComparisons />
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default ChartsPage;
