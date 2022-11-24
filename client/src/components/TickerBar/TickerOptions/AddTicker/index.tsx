import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, Menu, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupOptions from 'components/TickerBar/TickerOptions/GroupOptions';
import { TickerModel } from 'models/tickers/TickerModel';
import { WatchingGroupModel } from 'models/groups/WatchingGroupModel';
import AddNewGroupForm from 'components/WatchingGroups/AddNewGroupForm';
import { useAppDispatch } from 'rdx/hooks';
import { setGroups } from 'rdx/groups/actions';
import { v4 as createId } from 'uuid';

type Props = {
  ticker: TickerModel;
  groups: WatchingGroupModel[];
};

const AddTicker = ({ ticker, groups }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = useMemo(() => !!anchorEl, [anchorEl]);
  const dispatch = useAppDispatch();

  const handleOpenMenu = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      setAnchorEl(ev.currentTarget);
    },
    [setAnchorEl]
  );
  const handleMenuClose = useCallback(
    (ev: {} & Event) => {
      ev.stopPropagation();
      setAnchorEl(null);
    },
    [setAnchorEl]
  );
  const addGroup = useCallback(
    (groupName: string) => {
      dispatch(
        setGroups(
          groups.concat({
            id: createId(),
            title: groupName,
            tickers: [],
          })
        )
      );
    },
    [dispatch, groups]
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
          <AddNewGroupForm onSubmit={addGroup} />
        )}
      </Menu>
    </>
  );
};

export default AddTicker;
