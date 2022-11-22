import React, { useCallback, useMemo } from 'react';
import { ChartTickerModel } from 'models/tickers/TickerModel';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Tickers } from 'models/tickers/Tickers';

type Props = {
  ticker: ChartTickerModel;
  onClick: (ticker: ChartTickerModel) => void;
  onRemove?: (ticker: Tickers) => void;
};

const TickerCard = ({ ticker, onClick, onRemove }: Props) => {
  const handleClick = useCallback(() => onClick(ticker), [onClick, ticker]);
  const [searchParams] = useSearchParams();

  const isSelected = useMemo(
    () =>
      searchParams.getAll('compareTo').find((param) => param === ticker.ticker),
    [searchParams, ticker.ticker]
  );

  const handleRemoveClick = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      if (onRemove) {
        onRemove(ticker.ticker);
      }
    },
    [onRemove, ticker.ticker]
  );

  return (
    <div
      onClick={handleClick}
      className={`${
        isSelected ? 'border-b-4 border-b-purple-700' : ''
      } group hover:shadow-lg first:mt-2 first:ml-2 cursor-pointer basis-44 rounded-md border border-neutral-300 p-2 flex flex-col space-y-1`}
    >
      <div className='flex justify-between'>
        <div className='text-sm'>{ticker.ticker}</div>
        <IconButton
          onClick={handleRemoveClick}
          className='group-hover:visible invisible'
        >
          <ClearIcon />
        </IconButton>
      </div>
      <div className='text-lg font-medium'>{ticker.price} $</div>
    </div>
  );
};

export default TickerCard;
