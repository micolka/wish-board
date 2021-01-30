import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import AddingWishCard from '@/components/AddingWishCard';
import ModalDeleting from '@/components/ModalDeleting';
import styles from '@/components/StatsItem/StatsItem.scss';
import { STAT_NAME } from '@/constants';
import AuthContext from '@/context/AuthContext';
import { LIKE_WISH } from '@/graphql/mutation';
import { TUser } from '@/types/data';

type StatsProps = {
  children: ReactNode;
  text: string;
  wishId: string;
  statName: string;
  wishName: string;
  modalTitle: string;
  isActiveStat: boolean;
  user: TUser;
  color: string;
};

const StatsItem: FunctionComponent<StatsProps> = ({
  children,
  text,
  isActiveStat,
  statName,
  wishName,
  wishId,
  modalTitle,
  user,
  color,
}) => {
  const [isStatsChecked, setStatsChecked] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (user && isActiveStat) {
      setStatsChecked(isActiveStat);
    } else setStatsChecked(isActiveStat);
  }, [user, isActiveStat]);

  const routeChange = () => {
    const path = '/login';
    history.push(path);
  };

  const [likeWish] = useMutation(LIKE_WISH, {
    onError(error) {
      if (error?.message === 'Invalid/Expired token') {
        logout();
        routeChange();
      }
    },
    variables: { wishId },
  });

  const StatsChecked = () => {
    if (user.id) {
      if (statName === STAT_NAME.like) {
        return likeWish();
      }
      return undefined;
    }
    return routeChange();
  };

  const iconComponent = (
    <div className={styles['stats-item']}>
      <div
        tabIndex={0}
        role="button"
        onClick={StatsChecked}
        onKeyPress={() => {}}
        className={classNames(
          styles['stats-icon-border'],
          isStatsChecked ? styles[`checked-${color}`] : styles['unchecked']
        )}
      >
        {children}
      </div>
      <span>{text}</span>
    </div>
  );

  const iconWithModal = isActiveStat ? (
    <ModalDeleting nameModal={modalTitle} wishId={wishId}>
      {iconComponent}
    </ModalDeleting>
  ) : (
    <AddingWishCard nameModal={modalTitle} wishName={wishName} wishId={wishId}>
      {iconComponent}
    </AddingWishCard>
  );

  return (
    <Fragment>
      {statName === STAT_NAME.active || statName === STAT_NAME.fulfilled
        ? iconWithModal
        : iconComponent}
    </Fragment>
  );
};
export default StatsItem;
