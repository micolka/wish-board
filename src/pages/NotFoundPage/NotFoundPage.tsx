import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/pages/NotFoundPage/NotFoundPage.scss';

const NotFoundPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['not-found-page']}>Not Found Page</div>
);
export default NotFoundPage;
