import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/pages/SingleWish/SingleWish.scss';

const SingleWish: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['not-found-page']}>Single Wish</div>
);
export default SingleWish;
