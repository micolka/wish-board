import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/pages/FriendsPage/FriendsPage.scss';

const FriendsPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['friends-page']}>Friends Page</div>
);
export default FriendsPage;
