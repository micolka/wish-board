import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import React, { Fragment, useState } from 'react';

import { ACTIVE_WISH, FULFILLED_WISH } from '@/components/AddingWishCard/mutation';
import { MODAL_NAME } from '@/constants';

interface DeletingWishProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  wishId: string;
  nameModal: string;
}

const ModalDeleting: FunctionComponent<DeletingWishProps> = ({ wishId, children, nameModal }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [activeWish] = useMutation(ACTIVE_WISH, {
    variables: { wishId },
  });

  const [fulfilledWish] = useMutation(FULFILLED_WISH, {
    variables: { wishId },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (nameModal === MODAL_NAME.activeDelete) {
      return activeWish();
    }
    return fulfilledWish();
  };

  return (
    <Fragment>
      <div onClick={handleClickOpen} onKeyPress={() => {}} tabIndex={0} role="button">
        {children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{nameModal}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Вы точно уверены?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleSubmit} style={{ color: '#e74c1f' }} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ModalDeleting;
