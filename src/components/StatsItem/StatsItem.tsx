import React, { FunctionComponent } from 'react';

import styles from '@/components/StatsItem/StatsItem.scss';

type StatsProps = {
  children: any;
  text: string;
};

const StatsItem: FunctionComponent<StatsProps> = ({ children, text }) => (
  <div className={styles['stats-item']}>
    <span className={styles['stats-icon-border']}>{children}</span>
    <span>{text}</span>
  </div>
);

export default StatsItem;
