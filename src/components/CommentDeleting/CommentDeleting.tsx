import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FunctionComponent } from 'react';
import * as React from 'react';

import { MODAL_NAME } from '@/constants';

const CommentDeleting: FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h2 style={{ fontSize: '34px', lineHeight: '40px' }}>{MODAL_NAME.commentDelete}</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {MODAL_NAME.notPossibleToRestore}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{MODAL_NAME.cancel}</Button>
          <Button onClick={handleClose} style={{ color: '#e74c1f' }} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentDeleting;
