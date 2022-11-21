import React, { useMemo } from 'react';
import { Breadcrumbs } from '@mui/material';
import { usePageTicker } from 'hooks/useChartTicker';
import { Link } from 'react-router-dom';
import TickerChart from 'components/TickerChart';
import { tickerToTickerName } from 'utils/tickers';
import { Tickers } from 'models/tickers/Tickers';
import ChartInfo from 'components/TickerChart/ChartInfo';

const ChartsPage = () => {
  const { data, loading, error, ticker } = usePageTicker();

  const tickerName = useMemo(
    () => tickerToTickerName(ticker as Tickers),
    [ticker]
  );

  const tickerData = useMemo(
    () => data?.find((series) => series.label === ticker)?.data,
    [data, ticker]
  );

  return (
    <div>
      <Breadcrumbs>
        <Link className='hover:underline' to='/'>
          Home
        </Link>
        <span className='font-medium'>{ticker}</span>
      </Breadcrumbs>
      <div className='text-2xl font-medium my-2'>{tickerName}</div>
      <hr />
      {!error ? (
        <>
          {!loading && data?.length && tickerData ? (
            <div className='relative'>
              <ChartInfo interval='yday' tickerData={tickerData} />
              <TickerChart data={data} />
            </div>
          ) : null}
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default ChartsPage;
