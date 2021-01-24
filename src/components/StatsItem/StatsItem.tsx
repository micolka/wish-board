import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import styles from '@/components/StatsItem/StatsItem.scss';
import LIKE_WISH from '@/components/StatsItem/mutation';
import { STAT_NAME } from '@/constants';
import { TUser } from '@/types/data';

type StatsProps = {
  children: ReactNode;
  text: string;
  wishId: string;
  statName: string;
  isActiveStat: boolean;
  user: TUser;
  color: string;
};

const StatsItem: FunctionComponent<StatsProps> = ({
  children,
  text,
  isActiveStat,
  statName,
  wishId,
  user,
  color,
}) => {
  const [isStatsChecked, setStatsChecked] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    if (user && isActiveStat) {
      setStatsChecked(isActiveStat);
    } else setStatsChecked(isActiveStat);
  }, [user, isActiveStat]);

  const [likeWish] = useMutation(LIKE_WISH, {
    variables: { wishId },
  });

  const routeChange = () => {
    const path = '/login';
    history.push(path);
  };

  const StatsChecked = () => {
    if (user.id) {
      if (statName === STAT_NAME.like) {
        return likeWish();
      }
      return undefined;
    }
    return routeChange();
  };

  return (
    <div className={styles['stats-item']}>
      <div
        tabIndex={0}
        role="button"
        onClick={StatsChecked}
        onKeyPress={() => {}}
        className={classNames(
          styles['stats-icon-border'],
          isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
        )}
      >
        {children}
      </div>
      <span>{text}</span>
    </div>
  );
};
export default StatsItem;
