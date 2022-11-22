import React, { useCallback } from 'react';
import { useAppDispatch } from 'rdx/hooks';
import { TickerInterval } from 'services/tickersService';
import { getTickerChartDataForDifferentInterval } from 'rdx/charts/thunks';
import IntervalSettings from './IntervalSettings';
import FieldSettings from './FieldSettings';
import { setField } from 'rdx/charts/actions';
import { ChartTickerModel } from 'models/tickers/TickerModel';

const ChartSettings = () => {
  const dispatch = useAppDispatch();

  const handleIntervalChange = useCallback(
    (interval: TickerInterval) =>
      dispatch(getTickerChartDataForDifferentInterval(interval)),
    [dispatch]
  );
  const handleFieldChange = useCallback(
    (field: keyof ChartTickerModel) => dispatch(setField(field)),
    [dispatch]
  );

  return (
    <div className='flex flex-col space-y-2'>
      <IntervalSettings onChange={handleIntervalChange} />
      <FieldSettings onChange={handleFieldChange} />
    </div>
  );
};

export default ChartSettings;
