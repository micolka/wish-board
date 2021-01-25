import { useMutation } from '@apollo/client';
import { Button, Input } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import React, { useRef, useState } from 'react';
import type { FunctionComponent, FormEvent, HTMLAttributes } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import CommentItem from '@/components/CommentItem';
import styles from '@/components/Comments/Comments.scss';
import ADD_COMMENT from '@/components/Comments/mutation';
import DeleteButton from '@/components/DeleteButton';
import { MODAL_NAME } from '@/constants';
import { TComment, TUser } from '@/types/data';

interface CommentsProps extends HTMLAttributes<HTMLDivElement> {
  wishId: string;
  username: string;
  comments: TComment[];
  user: TUser;
}

const Comments: FunctionComponent<CommentsProps> = ({ wishId, username, comments, user }) => {
  const [comment, setComment] = useState('');
  const history = useHistory();
  const commentInputRef = useRef<HTMLInputElement | null>(null);
  const [submitComment] = useMutation(ADD_COMMENT, {
    update() {
      commentInputRef.current?.blur();
      setComment('');
    },
    variables: {
      wishId,
      username,
      body: comment,
    },
  });

  const routeChange = () => {
    if (!user.id) {
      const path = '/login';
      history.push(path);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return submitComment();
  };

  return (
    <div className={styles['comments-container']}>
      <h3 className={styles['comments-title']}>
        <CommentIcon />
        <span>Комментарии</span>
      </h3>
      <div className={styles['adding-comment-container']}>
        {user.id ? (
          <Link className={styles['user-link']} to={`/@${user.username}`}>
            <Avatar user={user} size="normal" />
          </Link>
        ) : (
          ''
        )}
        <div className={styles['write-send-container']}>
          <form onSubmit={handleSubmit} className={styles['form']} noValidate autoComplete="off">
            <Input
              name={comment}
              placeholder="Напишите комментарий..."
              inputProps={{ 'aria-label': 'description' }}
              ref={commentInputRef}
              value={comment}
              onFocus={() => routeChange()}
              onChange={event => setComment(event.target.value)}
            />
            <Button
              className={styles['comment-button']}
              type="submit"
              variant="outlined"
              disabled={comment.trim() === ''}
              color="secondary"
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
      {comments?.map(comm => (
        <div className={styles['comment-item']} key={comm.id}>
          <CommentItem comment={comm} key={comm.id} />
          {comm.user.id === user.id ? (
            <DeleteButton
              wishId={wishId}
              modalTitle={MODAL_NAME.commentDelete}
              username={username}
              commentId={comm.id}
            />
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
export default Comments;
