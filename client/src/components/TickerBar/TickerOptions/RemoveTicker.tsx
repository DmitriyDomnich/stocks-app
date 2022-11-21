import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from 'rdx/hooks';
import { toggleGroupTicker } from 'rdx/groups/actions';
import { WatchingGroupModel } from 'models/groups/WatchingGroupModel';
import { TickerModel } from 'models/tickers/TickerModel';

type Props = {
  group: WatchingGroupModel;
  ticker: TickerModel;
};

const RemoveTicker = ({ ticker, group }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = useCallback(
    () => dispatch(toggleGroupTicker({ group, ticker: ticker.ticker })),
    [dispatch, group, ticker.ticker]
  );

  return (
    <IconButton onClick={handleRemove}>
      <ClearIcon />
    </IconButton>
  );
};

export default RemoveTicker;
