import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import styles from '@/components/StatsItem/StatsItem.scss';
import { ACTIVE_WISH, FULFILLED_WISH, LIKE_WISH } from '@/components/StatsItem/mutation';
import { TActive, TUser, TFulfilled, TLike } from '@/types/data';

type StatsProps = {
  children: ReactNode;
  text: string;
  wishId: string;
  statName: string;
  stats: TLike[] | TActive[] | TFulfilled[];
  user: TUser;
  color: string;
  userCollections: Array<string>;
};

const StatsItem: FunctionComponent<StatsProps> = ({
  children,
  text,
  stats,
  statName,
  wishId,
  user,
  color,
}) => {
  const [isStatsChecked, setStatsChecked] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    if (user && stats.find(stat => stat.username === user.username)) {
      setStatsChecked(true);
    } else setStatsChecked(false);
  }, [user, stats]);

  const [likeWish] = useMutation(LIKE_WISH, {
    variables: { wishId },
  });

  const [activeWish] = useMutation(ACTIVE_WISH, {
    variables: { wishId },
  });

  const [fulfilledWish] = useMutation(FULFILLED_WISH, {
    variables: { wishId },
  });

  const routeChange = () => {
    const path = '/login';
    history.push(path);
  };

  const StatsChecked = () => {
    setStatsChecked(!isStatsChecked);
    if (user.id) {
      if (statName === 'fulfilled') {
        return fulfilledWish();
      }
      if (statName === 'active') {
        return activeWish();
      }
      return likeWish();
    }
    return routeChange();
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
          isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
        )}
      >
        {children}
      </span>
      <span>{text}</span>
    </div>
  );
};
export default StatsItem;
