import { useMutation } from '@apollo/client';
import { FavoriteBorder, Check, Comment, Add } from '@material-ui/icons';
import classNames from 'classnames';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AddingWishCard from '@/components/AddingWishCard';
import styles from '@/components/MaterialIcon/MaterialIcon.scss';
import LIKE_WISH from '@/components/MaterialIcon/mutation';
import { MODAL_NAME, STAT_NAME } from '@/constants';
import AuthContext from '@/context/AuthContext';
import { TUser } from '@/types/data';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  iconName: string;
  color: string;
  nickname?: string;
  wishName: string;
  count: number;
  wishId: string;
  isActiveStat?: boolean;
}

const MaterialIcon: FunctionComponent<IconProps> = ({
  iconName,
  count,
  nickname,
  wishName,
  color,
  wishId,
  isActiveStat,
}) => {
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
  } as TUser;

  useEffect(() => {
    if (user.id && isActiveStat) {
      setStatsChecked(true);
    } else setStatsChecked(false);
  }, [user.id, user.username, isActiveStat]);

  const [likeWish] = useMutation(LIKE_WISH, {
    variables: { wishId },
  });

  const routeChange = () => {
    if (iconName !== 'comments') {
      const path = '/login';
      history.push(path);
    }
  };

  const StatsChecked = () => {
    if (user.id) {
      if (iconName === STAT_NAME.like) {
        return likeWish();
      }
      return undefined;
    }
    return routeChange();
  };

  return (
    <Fragment>
      {iconName === STAT_NAME.like ? (
        <div
          className={classNames(
            styles.single_stat_container,
            isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
          )}
          onClick={StatsChecked}
          onKeyPress={() => {}}
          tabIndex={0}
          role="button"
        >
          <FavoriteBorder />
          <span className={styles.stats_count}>{count}</span>
        </div>
      ) : (
        ''
      )}
      {iconName === STAT_NAME.active ? (
        <AddingWishCard nameModal={MODAL_NAME.active} wishName={wishName} wishId={wishId}>
          <div
            className={classNames(
              styles.single_stat_container,
              isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
            )}
            onClick={StatsChecked}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <Add />
            <span className={styles.stats_count}>{count}</span>
          </div>
        </AddingWishCard>
      ) : (
        ''
      )}
      {iconName === STAT_NAME.fulfilled ? (
        <AddingWishCard nameModal={MODAL_NAME.fulfilled} wishName={wishName} wishId={wishId}>
          <div
            className={classNames(
              styles.single_stat_container,
              isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
            )}
            onClick={StatsChecked}
            onKeyPress={() => {}}
            tabIndex={0}
            role="button"
          >
            <Check />
            <span className={styles.stats_count}>{count}</span>
          </div>
        </AddingWishCard>
      ) : (
        ''
      )}
      {iconName === STAT_NAME.comments && nickname ? (
        <div
          className={classNames(
            styles.single_stat_container,
            isStatsChecked ? styles[`checked-${color}`] : styles[`unchecked-${color}`]
          )}
        >
          <Link to={`/wish/@${nickname}/${wishId}`}>
            <Comment />
          </Link>
          <span className={styles.stats_count}>{count}</span>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default MaterialIcon;
