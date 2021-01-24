import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import Avatar from '@/components/Avatar/';
import styles from '@/components/CommentItem/CommentItem.scss';
import { TComment } from '@/types/data';

interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: TComment;
}
const CommentItem: FunctionComponent<CommentProps> = ({ comment }) => (
  <div className={styles['wish-comment']}>
    <Avatar user={comment.user} size="normal" />
    <div className={styles['comment-info-container']}>
      <div className={styles['login-comment-container']}>
        <h4>{comment.user.username}</h4>
        <p>{comment.body}</p>
      </div>
      <div className={styles['comment-date']}>{comment.createdAt}</div>
    </div>
  </div>
);
export default CommentItem;
