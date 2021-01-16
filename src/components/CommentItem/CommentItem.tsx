import React, { FunctionComponent } from 'react';

import styles from '@/components/CommentItem/CommentItem.scss';
import { TComment } from '@/types/SingleWish';

const CommentItem: FunctionComponent<TComment> = comment => (
  <div className={styles['wish-comment']}>
    <img
      alt={comment.username}
      className={styles['user-avatar_small']}
      src={comment.avatar.small}
    />
    <div className={styles['comment-info-container']}>
      <div className={styles['login-comment-container']}>
        <h4>{comment.username}</h4>
        <p>{comment.body}</p>
      </div>
      <div className={styles['comment-date']}>{comment.createdAt}</div>
    </div>
  </div>
);
export default CommentItem;
