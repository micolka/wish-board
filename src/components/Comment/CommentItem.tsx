import React, { FunctionComponent } from 'react';

import styles from '@/components/Comment/CommentItem.scss';
import { IComment } from '@/types/SingleWish';

const CommentItem: FunctionComponent<IComment> = comment => (
  <div className={styles['wish-comment']}>
    <img alt={comment.login} className={styles['user-avatar_small']} src={comment.userAvatarUrl} />
    <div className={styles['comment-info-container']}>
      <div className={styles['login-comment-container']}>
        <h4>{comment.login}</h4>
        <p>{comment.text}</p>
      </div>
      <div className={styles['comment-date']}>{comment.date}</div>
    </div>
  </div>
);
export default CommentItem;
