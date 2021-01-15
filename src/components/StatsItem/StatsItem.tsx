import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from '@/components/StatsItem/StatsItem.scss';

type StatsProps = {
  children: React.ReactNode;
  text: string;
};

const StatsItem: FunctionComponent<StatsProps> = ({ children, text }) => {
  const [isStatsChecked, setStatsChecked] = React.useState<boolean | HTMLElement>(false);

  const StatsChecked = () => {
    setStatsChecked(!isStatsChecked);
  };
  return (
    <div className={styles['stats-item']}>
      <span
        tabIndex={0}
        role="button"
        onClick={StatsChecked}
        onKeyPress={() => {}}
        className={classNames(
          styles['stats-icon-border'],
          isStatsChecked ? styles['checked'] : styles['unchecked']
        )}
      >
        {children}
      </span>
      <span>{text}</span>
    </div>
  );
};
export default StatsItem;
