import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as createId } from 'uuid';
import { setGroups } from '../../rdx/groups/actions';
import { useAppDispatch } from 'rdx/hooks';
import { WatchingGroupModel } from 'models/groups/WatchingGroupModel';

type Props = {
  groups: WatchingGroupModel[];
};

const AddNewGroupForm = ({ groups }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [groupName, setGroupName] = useState('');

  const dispatch = useAppDispatch();

  const addGroup = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      if (groupName) {
        dispatch(
          setGroups(
            groups.concat({
              id: createId(),
              title: groupName,
              tickers: [],
            })
          )
        );
        setGroupName('');
        setShowDialog(false);
      }
    },
    [dispatch, groups, groupName]
  );

  const handleTextChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => setGroupName(ev.target.value),
    [setGroupName]
  );
  const handleOpen = useCallback(() => setShowDialog(true), [setShowDialog]);
  const handleClose = useCallback(() => setShowDialog(false), [setShowDialog]);

  return (
    <>
      <Dialog open={showDialog} onClose={handleClose}>
        <form onSubmit={addGroup}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give a name to a new watching group
            </DialogContentText>
            <TextField
              value={groupName}
              onChange={handleTextChange}
              autoFocus
              margin='dense'
              label='Group name'
              type='text'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button className='!mt-2 !ml-2' onClick={handleOpen}>
        <AddIcon className='mr-2' /> Create group
      </Button>
    </>
  );
};

export default AddNewGroupForm;
