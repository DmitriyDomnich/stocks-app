import React, { useCallback } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useAppSelector } from 'rdx/hooks';
import { selectChartTickerField } from 'rdx/charts/selectors';

type Props = {
  onChange: (val: keyof ChartTickerModel) => void;
};

const FieldSettings = ({ onChange }: Props) => {
  const field = useAppSelector(selectChartTickerField);

  const handleFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) =>
      onChange(value as keyof ChartTickerModel),
    [onChange]
  );

  return (
    <FormControl className='order-last'>
      <FormLabel id='field-radio'>Chart value</FormLabel>
      <RadioGroup
        value={field}
        onChange={handleFormChange}
        row
        name='field-radio'
      >
        <FormControlLabel value='price' control={<Radio />} label='Price' />
        <FormControlLabel
          value='dividend'
          control={<Radio />}
          label='Dividend'
        />
        <FormControlLabel value='yield' control={<Radio />} label='Yield' />
      </RadioGroup>
    </FormControl>
  );
};

export default FieldSettings;
