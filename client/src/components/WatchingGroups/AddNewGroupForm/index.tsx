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

type Props = {
  onSubmit?: (groupName: string) => void;
};

const AddNewGroupForm = ({ onSubmit }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [groupName, setGroupName] = useState('');

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      if (groupName) {
        onSubmit && onSubmit(groupName);

        setGroupName('');
        setShowDialog(false);
      }
    },
    [groupName, onSubmit]
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
        <form onSubmit={handleSubmit}>
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
              inputProps={{ 'aria-label': 'group' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button
        data-testid='show-dialog-button'
        className='!mt-2 !ml-2'
        onClick={handleOpen}
      >
        <AddIcon className='mr-2' /> Create group
      </Button>
    </>
  );
};

export default AddNewGroupForm;
