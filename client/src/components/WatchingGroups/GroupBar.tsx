import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchingGroupModel } from '../../models/groups/WatchingGroupModel';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ClearIcon from '@mui/icons-material/Clear';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch } from 'rdx/hooks';
import { removeGroup } from 'rdx/groups/actions';

type Props = {
  group: WatchingGroupModel;
  selected: boolean;
};

const GroupBar = ({ group, selected }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const goToGroup = useCallback(() => {
    console.log('called');
    navigate(selected ? '/' : `/?group=${group.id}`);
  }, [navigate, selected, group.id]);
  const handleRemoveGroup = useCallback(
    () => dispatch(removeGroup(group.id)),
    [dispatch, group.id]
  );
  const handleDialogOpen = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      setOpen(true);
    },
    [setOpen]
  );
  const handleDialogClose = useCallback(
    (ev: React.SyntheticEvent) => {
      ev.stopPropagation();
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <div
      onClick={goToGroup}
      className={`group cursor-pointer hover:shadow-xl rounded-md border items-center border-[#dadce0] p-1 pr-2 flex space-x-1 justify-between ${
        selected ? 'border-b-4 border-b-purple-700' : ''
      }`}
    >
      <div className='space-x-2 mr-3'>
        <FormatListBulletedIcon fontSize='small' />
        <span className='font-medium'>{group.title}</span>
      </div>
      <span className='text-neutral-600'>{group.tickers.length}</span>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Remove {group.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText>You can't get it back</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleDialogClose} autoFocus>
            Disagree
          </Button>
          <Button color='error' onClick={handleRemoveGroup}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={handleDialogOpen}>
        <ClearIcon fontSize='small' className='group-hover:visible invisible' />
      </IconButton>
    </div>
  );
};

export default GroupBar;
