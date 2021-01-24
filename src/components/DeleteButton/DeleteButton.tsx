import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import ModalDeleting from '../ModalDeleting';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);
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
}) => {
  const classes = useStyles();

  return (
    <ModalDeleting nameModal={modalTitle} wishId={wishId} commentId={commentId} username={username}>
      <IconButton aria-label="delete" className={classes.margin}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ModalDeleting>
  );
};
export default DeleteButton;
