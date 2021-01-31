import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import React, { Fragment, useState } from 'react';

import { MODAL_NAME } from '@/constants';
import {
  DELETE_ACTIVE_WISH,
  DELETE_FULFILLED_WISH,
  DELETE_WISH,
  DELETE_COMMENT,
} from '@/graphql/mutation/mutation-delete-wish';
import { FETCH_WISHES_QUERY } from '@/graphql/query';
import { TGetWishes } from '@/types/data';

interface DeletingWishProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  wishId: string;
  nameModal: string;
  commentId?: string;
  username?: string;
}

const ModalDeleting: FunctionComponent<DeletingWishProps> = ({
  wishId,
  commentId,
  children,
  nameModal,
  username,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [activeWish] = useMutation(DELETE_ACTIVE_WISH, {
    variables: { wishId },
  });

  const [fulfilledWish] = useMutation(DELETE_FULFILLED_WISH, {
    variables: { wishId },
  });

  const handleClose = () => {
    setOpen(false);
  };
  const mutation = commentId ? DELETE_COMMENT : DELETE_WISH;
  const [deleteComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery<TGetWishes>({
          query: FETCH_WISHES_QUERY,
        });

        data!.getWishes = data!.getWishes.filter(wish => wish.id !== wishId);
        proxy.writeQuery({ query: FETCH_WISHES_QUERY, data });
      }
    },
    variables: {
      wishId,
      usernameOwner: username,
      commentId,
    },
  });

  const handleSubmit = () => {
    setOpen(false);
    if (nameModal === MODAL_NAME.activeDelete) {
      return activeWish();
    }
    if (nameModal === MODAL_NAME.fulfilledDelete) {
      return fulfilledWish();
    }

    return deleteComment();
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
