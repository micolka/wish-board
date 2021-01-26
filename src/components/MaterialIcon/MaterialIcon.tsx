import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import React, { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';

import AddingWishCard from '@/components/AddingWishCard';
import styles from '@/components/MaterialIcon/MaterialIcon.scss';
import LIKE_WISH from '@/components/MaterialIcon/mutation';
import ModalDeleting from '@/components/ModalDeleting';
import { STAT_NAME } from '@/constants';
import AuthContext from '@/context/AuthContext';
import { TUser } from '@/types/data';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  iconName: string;
  wishName: string;
  modalTitle: string;
  wishId: string;
  isActiveStat: boolean;
  color: string;
}

const MaterialIcon: FunctionComponent<IconProps> = ({
  children,
  iconName,
  wishName,
  modalTitle,
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
    if (iconName !== STAT_NAME.comment) {
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

  const iconComponent = (
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
      {children}
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
      {iconName === STAT_NAME.active || iconName === STAT_NAME.fulfilled
        ? iconWithModal
        : iconComponent}
    </Fragment>
  );
};

export default MaterialIcon;
