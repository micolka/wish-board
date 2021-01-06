import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/pages/ProfilePage/ProfilePage.scss';

const ProfilePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['profile-page']}>Profile Page</div>
);
export default ProfilePage;
