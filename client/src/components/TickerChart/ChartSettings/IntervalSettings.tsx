import React, { useCallback } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { TickerInterval } from 'services/tickersService';
import { useAppSelector } from 'rdx/hooks';
import { selectChartTickerInterval } from 'rdx/charts/selectors';

type Props = {
  onChange: (interval: TickerInterval) => void;
};

const IntervalSettings = ({ onChange }: Props) => {
  const interval = useAppSelector(selectChartTickerInterval);

  const handleFormChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, value: string) =>
      onChange(value as TickerInterval),
    [onChange]
  );

  return (
    <FormControl>
      <FormLabel id='interval-radio'>Interval</FormLabel>
      <RadioGroup
        value={interval}
        onChange={handleFormChange}
        row
        name='interval-radio'
      >
        <FormControlLabel value='yday' control={<Radio />} label='Yesterday' />
        <FormControlLabel value='5D' control={<Radio />} label='5 days' />
        <FormControlLabel value='1M' control={<Radio />} label='1 month' />
        <FormControlLabel value='6M' control={<Radio />} label='6 month' />
      </RadioGroup>
    </FormControl>
  );
};

export default IntervalSettings;
