import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FunctionComponent } from 'react';
import * as React from 'react';

const CommentDeleting: FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

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
          <h2 style={{ fontSize: '34px', lineHeight: '40px' }}>Удалить комментарий?</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Восстановить его не получится :(
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleClose} style={{ color: '#e74c1f' }} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentDeleting;
