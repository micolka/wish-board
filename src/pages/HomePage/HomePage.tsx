import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/pages/HomePage/HomePage.scss';

const SingleWish: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['home-page']}>Home Page</div>
);
export default SingleWish;
