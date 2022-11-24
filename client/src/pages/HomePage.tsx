import React, { useContext, useEffect, useState } from 'react';
import Dashboard from 'components/Dashboard';
import { useAppDispatch, useAppSelector } from 'rdx/hooks';
import { selectAllTickers } from 'rdx/tickers/selectors';
import { setTickers } from 'rdx/tickers/actions';
import WatchingGroupModels from 'components/WatchingGroups';
import { TickerModel } from 'models/tickers/TickerModel';
import { SocketContext } from 'App';
import { clearCharts } from 'rdx/charts/actions';
import { CircularProgress } from '@mui/material';

const HomePage = () => {
  const tickers = useAppSelector(selectAllTickers);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const [connectionError, setConnectionError] = useState('');

  useEffect(() => {
    dispatch(clearCharts());

    socket.io.on('error', (error: any) => setConnectionError(error.toString()));
    socket.on('ticker', (data: TickerModel[]) => dispatch(setTickers(data)));

    socket.connect();
    socket.emit('start');

    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return (
    <>
      {!connectionError ? (
        <>
          {tickers.length ? (
            <>
              <Dashboard tickers={tickers} />
              <WatchingGroupModels />
            </>
          ) : (
            <div className='text-center'>
              <CircularProgress size={40} />
            </div>
          )}
        </>
      ) : (
        <div className='text-center text-4xl'>
          Error while loading page content, try refreshing
        </div>
      )}
    </>
  );
};

export default HomePage;
