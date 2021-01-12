import { Button, Input } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import CommentItem from '@/components/Comment/CommentItem';
import styles from '@/components/Comments/Comments.scss';
import { IUser, IComment } from '@/types/SingleWish';

interface CommentsProps extends HTMLAttributes<HTMLDivElement> {
  comments: IComment[];
}

const user: IUser = {
  userId: 1,
  login: 'Vasya999',
  avatar: {
    small: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
    normal: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
  },
};

const Comments: FunctionComponent<CommentsProps> = ({ comments }) => (
  <div className={styles['comments-container']}>
    <h3 className={styles['comments-title']}>
      <CommentIcon />
      <span>Комментарии</span>
    </h3>
    <div className={styles['adding-comment-container']}>
      <img alt={user.login} className={styles['user-avatar_small']} src={user.avatar.small} />
      <div className={styles['write-send-container']}>
        <form noValidate autoComplete="off">
          <Input
            placeholder="Напишите комментарий..."
            inputProps={{ 'aria-label': 'description' }}
          />
        </form>
        <Button type="submit" variant="outlined" color="secondary">
          Отправить
        </Button>
      </div>
    </div>
    {comments.map(comment => (
      <CommentItem
        login={comment.login}
        text={comment.text}
        date={comment.date}
        userId={comment.userId}
        userAvatarUrl={comment.userAvatarUrl}
        key={`${comment.userId}${comment.date}`} // Нужно продумать способ задания уникальных ключей
      />
    ))}
  </div>
);
export default Comments;
