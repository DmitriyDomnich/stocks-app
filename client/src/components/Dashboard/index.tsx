import React, { useCallback } from 'react';
import TickerBar from 'components/TickerBar';
import { TickerModel } from 'models/tickers/TickerModel';
import { useAppSelector } from 'rdx/hooks';
import { selectGroups } from 'rdx/groups/selectors';
import TickerHeaders from 'components/TickerBar/TickerHeaders';
import { useNavigate } from 'react-router-dom';
import { Tickers } from 'models/tickers/Tickers';
import AddTicker from 'components/TickerBar/TickerOptions/AddTicker';

type Props = {
  tickers?: TickerModel[];
};

const Dashboard = ({ tickers }: Props) => {
  const groups = useAppSelector(selectGroups);
  const navigate = useNavigate();

  const goToChart = useCallback(
    (ticker: Tickers) => navigate(`/chart/${ticker}`),
    [navigate]
  );

  return (
    <div className='p-2 bg-slate-200'>
      <table className='w-full'>
        <TickerHeaders />
        <tbody className='text-center'>
          {tickers?.map((ticker) => (
            <TickerBar onClick={goToChart} key={ticker.ticker} ticker={ticker}>
              <AddTicker groups={groups} ticker={ticker} />
            </TickerBar>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
