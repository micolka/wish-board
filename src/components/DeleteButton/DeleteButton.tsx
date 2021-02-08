import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import ModalDeleting from '../ModalDeleting';

interface DeleteButtonProps extends HTMLAttributes<HTMLDivElement> {
  wishId: string;
  commentId: string;
  username: string;
  modalTitle: string;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({
  wishId,
  modalTitle,
  username,
  commentId,
}) => (
  <ModalDeleting nameModal={modalTitle} wishId={wishId} commentId={commentId} username={username}>
    <IconButton aria-label="delete">
      <DeleteIcon fontSize="small" />
    </IconButton>
  </ModalDeleting>
);
export default DeleteButton;
