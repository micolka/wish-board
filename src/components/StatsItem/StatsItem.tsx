import React, { FunctionComponent } from 'react';

import styles from '@/components/StatsItem/StatsItem.scss';
import classNames from "classnames";

type StatsProps = {
  children: React.ReactNode;
  text: string;
  color: string;
};

const StatsItem: FunctionComponent<StatsProps> = ({ children, text, color }) => {
  const [isStatsChecked, setStatsChecked] = React.useState<boolean | HTMLElement>(false);

  const StatsChecked = () => {
    setStatsChecked(!isStatsChecked);
  };
  return(
    <div className={styles['stats-item']}>
      <span onClick={StatsChecked}
          className={classNames(
          styles['stats-icon-border'],
          isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
        )}>
        {children}
      </span>
      <span>{text}</span>
    </div>
  );
};
export default StatsItem;
