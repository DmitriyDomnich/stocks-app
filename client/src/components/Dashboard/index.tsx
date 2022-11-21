import React from 'react';
import TickerBar from 'components/TickerBar';
import { TickerModel } from 'models/tickers/TickerModel';
import AddTicker from 'components/TickerBar/TickerOptions/AddTicker';
import { useAppSelector } from 'rdx/hooks';
import { selectGroups } from 'rdx/groups/selectors';
import TickerHeaders from 'components/TickerBar/TickerHeaders';

type Props = {
  tickers?: TickerModel[];
};

const Dashboard = ({ tickers }: Props) => {
  const groups = useAppSelector(selectGroups);

  return (
    <div className='p-2 bg-slate-200'>
      <table className='w-full'>
        <TickerHeaders />
        <tbody className='text-center'>
          {tickers?.map((ticker) => (
            <TickerBar key={ticker.ticker} ticker={ticker}>
              <AddTicker groups={groups} ticker={ticker} />
            </TickerBar>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
