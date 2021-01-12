import { Button, Input } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import React, { FC } from 'react';

import CommentItem from '@/components/Comment/CommentItem';
import styles from '@/components/Comments/Comments.scss';
import { IUser, IWish } from '@/types/SingleWish';

const user: IUser = {
  userId: 1,
  login: 'Vasya999',
  avatar: {
    small: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
    normal: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
  },
};

const Comments: FC<IWish> = ({ comments }) => (
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
      />
    ))}
  </div>
);
export default Comments;
