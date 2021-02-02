import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@/components/Avatar/';
import styles from '@/components/CommentItem/CommentItem.scss';
import { TComment } from '@/types/data';
import { formatDate } from '@/utils/formatters';

interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: TComment;
}

const CommentItem: FunctionComponent<CommentProps> = ({ comment }) => (
  <div className={styles['wish-comment']}>
    <Link className={styles['user-link']} to={`/@${comment.user.username}`}>
      <Avatar user={comment.user} size="normal" />
    </Link>
    <div className={styles['comment-info-container']}>
      <div className={styles['login-comment-container']}>
        <Link className={styles['user-link']} to={`/@${comment.user.username}`}>
          <h4>{comment.user.username}</h4>
        </Link>
        <p>{comment.body}</p>
      </div>
      <div className={styles['comment-date']}>{formatDate(comment.createdAt)}</div>
    </div>
  </div>
);
export default CommentItem;
