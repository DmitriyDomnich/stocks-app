import React, { useCallback, useMemo } from 'react';
import { Checkbox, MenuItem } from '@mui/material';
import { toggleGroupTicker } from '../../../rdx/groups/actions';
import { useAppDispatch } from '../../../rdx/hooks';
import { WatchingGroupModel } from '../../../models/groups/WatchingGroupModel';
import { TickerModel } from '../../../models/tickers/TickerModel';

type Props = {
  group: WatchingGroupModel;
  ticker: TickerModel;
};

const GroupOptions = ({ ticker, group }: Props) => {
  const dispatch = useAppDispatch();

  const isChecked = useMemo(
    () => !!group.tickers.find((groupTicker) => groupTicker === ticker.ticker),
    [group, ticker]
  );

  const handleChange = useCallback(
    () => dispatch(toggleGroupTicker({ group, ticker: ticker.ticker })),
    [dispatch, group, ticker]
  );

  return (
    <MenuItem disableRipple key={group.id}>
      <Checkbox onChange={handleChange} checked={isChecked} />
      {group.title}
    </MenuItem>
  );
};

export default GroupOptions;
