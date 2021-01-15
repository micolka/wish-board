/* eslint-disable no-bitwise */
import classNames from 'classnames';
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import styles from '@/components/Avatar/Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: {
    avatarSmall: string;
    nickname: string;
  };
  size: 'small' | 'normal' | 'huge';
}

const getUserNameFirstLetter = (name: string) => name.split('')[0].toLocaleUpperCase();

const stringToColor = function stringToColor(str: string) {
  let hash = 0;
  let color = '#';

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};

const Avatar: FunctionComponent<AvatarProps> = ({ user, size }) => (
  <div
    className={classNames(
      styles.user_avatar,
      size === 'small' ? styles.ava_small : '',
      size === 'normal' ? styles.ava_normal : '',
      size === 'huge' ? styles.ava_huge : ''
    )}
    title={user.nickname}
  >
    <Link className={styles['link']} to={`/@${user.nickname}`}>
      {user.avatarSmall ? (
        <img src={user.avatarSmall} alt={user.nickname} />
      ) : (
        <div
          className={styles.user_pseudo_avatar}
          style={{ backgroundColor: `${stringToColor(user.nickname)}` }}
        >
          <span>{getUserNameFirstLetter(user.nickname)}</span>
        </div>
      )}
    </Link>
  </div>
);

export default Avatar;
