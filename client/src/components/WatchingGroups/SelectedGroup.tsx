import React, { useCallback, useMemo } from 'react';
import { WatchingGroupModel } from 'models/groups/WatchingGroupModel';
import { useAppSelector } from 'rdx/hooks';
import { selectTickersByTickerNames } from 'rdx/tickers/selectors';
import TickerBar from 'components/TickerBar';
import RemoveTicker from 'components/TickerBar/TickerOptions/RemoveTicker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TickerHeaders from 'components/TickerBar/TickerHeaders';
import GroupSortSelect, { SortFieldsType } from './GroupSortSelect';
import { getSortFunction } from 'utils/tickers';
import { Tickers } from 'models/tickers/Tickers';

type Props = {
  group: WatchingGroupModel;
};

const SelectedGroup = ({ group }: Props) => {
  const tickers = useAppSelector(selectTickersByTickerNames(group.tickers));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortedTickers = useMemo(() => {
    const sortField = searchParams.get('sortField') as SortFieldsType;
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';

    if (!sortField || !sortOrder) {
      return tickers;
    }
    return tickers.sort(getSortFunction(sortField, sortOrder));
  }, [searchParams, tickers]);

  const goToChart = useCallback(
    (ticker: Tickers) => navigate(`/chart/${ticker}`),
    [navigate]
  );

  return (
    <div>
      {sortedTickers.length ? (
        <>
          <div className='flex justify-end pr-5'>
            <GroupSortSelect />
          </div>
          <table className='w-full'>
            <TickerHeaders />
            <tbody className='text-center'>
              {tickers?.map((ticker) => (
                <TickerBar
                  onClick={goToChart}
                  key={ticker.ticker}
                  ticker={ticker}
                >
                  <RemoveTicker ticker={ticker} group={group} />
                </TickerBar>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className='my-3 text-3xl text-center'>
          Tickers added to this group will show here
        </div>
      )}
    </div>
  );
};

export default SelectedGroup;
