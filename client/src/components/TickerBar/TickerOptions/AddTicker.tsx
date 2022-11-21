import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, Menu, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupOptions from 'components/TickerBar/TickerOptions/GroupOptions';
import { TickerModel } from 'models/tickers/TickerModel';
import { WatchingGroupModel } from 'models/groups/WatchingGroupModel';
import AddNewGroupForm from 'components/WatchingGroups/AddNewGroupForm';

type Props = {
  ticker: TickerModel;
  groups: WatchingGroupModel[];
};

const AddTicker = ({ ticker, groups }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = useMemo(() => !!anchorEl, [anchorEl]);

  const handleOpenMenu = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      setAnchorEl(ev.currentTarget);
    },
    [setAnchorEl]
  );
  const handleMenuClose = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      setAnchorEl(null);
    },
    [setAnchorEl]
  );

  return (
    <>
      <Tooltip title='Add the ticker to a watching group'>
        <IconButton onClick={handleOpenMenu}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        {groups.length ? (
          groups.map((group) => (
            <GroupOptions group={group} ticker={ticker} key={group.id} />
          ))
        ) : (
          <AddNewGroupForm groups={groups} />
        )}
      </Menu>
    </>
  );
};

export default AddTicker;
