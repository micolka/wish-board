import { useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import { DELETE_WISH, DELETE_COMMENT } from '@/components/DeleteButton/mutation';
import { TGetWishes } from '@/types/data';
import { FETCH_WISHES_QUERY } from '@/utils/query';

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
  callback?: () => void;
}

const DeleteButton: FunctionComponent<DeleteButtonProps> = ({ wishId, commentId, callback }) => {
  const classes = useStyles();
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
      if (callback) callback();
    },
    variables: {
      wishId,
      commentId,
    },
  });
  const handlerClick = () => deleteComment();

  return (
    <IconButton aria-label="delete" className={classes.margin} onClick={handlerClick}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
export default DeleteButton;
