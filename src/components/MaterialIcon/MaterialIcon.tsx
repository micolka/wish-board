import { useMutation } from '@apollo/client';
import { FavoriteBorder, Add, Check, Comment } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '@/components/MaterialIcon/MaterialIcon.scss';
import { ACTIVE_WISH, FULFILLED_WISH, LIKE_WISH } from '@/components/StatsItem/mutation';
import AuthContext from '@/context/AuthContex';
import { TActive, TCreator, TFulfilled, TLike } from '@/types/data';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  iconName: 'heart' | 'active' | 'fulfilled' | 'comments';
  color: 'red' | 'orange' | 'blue' | 'green';
  count: number;
  wishId: string;
  stats?: TLike[] | TActive[] | TFulfilled[];
}

const MaterialIcon: FunctionComponent<IconProps> = ({ iconName, count, color, wishId, stats }) => {
  const [isStatsChecked, setStatsChecked] = useState<boolean>(false);
  const history = useHistory();
  const { id, username, avatar } = useContext(AuthContext);
  const user = {
    id,
    username,
    avatar: {
      small: avatar.small,
      normal: avatar.small,
    },
  } as TCreator;

  useEffect(() => {
    if (user.id && stats?.find(stat => stat.username === user.username)) {
      setStatsChecked(true);
    } else setStatsChecked(false);
  }, [user.id, user.username, stats]);

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
    if (iconName !== 'comments') {
      const path = '/login';
      history.push(path);
    }
  };

  const StatsChecked = () => {
    setStatsChecked(!isStatsChecked);
    if (user.id) {
      if (iconName === 'fulfilled') {
        return fulfilledWish();
      }
      if (iconName === 'active') {
        return activeWish();
      }
      return likeWish();
    }
    return routeChange();
  };

  return (
    <div
      className={classNames(styles.single_stat_container, styles[`stat_${color}`])}
      onClick={StatsChecked}
      onKeyPress={() => {}}
      tabIndex={0}
      role="button"
    >
      {iconName === 'heart' ? <FavoriteBorder /> : ''}
      {iconName === 'active' ? <Add /> : ''}
      {iconName === 'fulfilled' ? <Check /> : ''}
      {iconName === 'comments' ? (
        <Link to={`/wish/${wishId}`}>
          <Comment />
        </Link>
      ) : (
        ''
      )}
      <span className={styles.stats_count}>{count}</span>
    </div>
  );
};

export default MaterialIcon;
