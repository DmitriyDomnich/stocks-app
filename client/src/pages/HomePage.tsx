import React, { useContext, useEffect } from 'react';
import Dashboard from 'components/Dashboard';
import { useAppDispatch, useAppSelector } from 'rdx/hooks';
import { selectAllTickers } from 'rdx/tickers/selectors';
import { setTickers } from 'rdx/tickers/actions';
import WatchingGroupModels from 'components/WatchingGroups';
import { TickerModel } from 'models/tickers/TickerModel';
import { SocketContext } from 'App';
import { clearCharts } from 'rdx/charts/actions';

const HomePage = () => {
  const tickers = useAppSelector(selectAllTickers);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(clearCharts());
    socket.connect();
    socket.on('ticker', (data: TickerModel[]) => dispatch(setTickers(data)));
    socket.emit('start');

    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return (
    <>
      <Dashboard tickers={tickers} />
      <WatchingGroupModels />
    </>
  );
};

export default HomePage;
