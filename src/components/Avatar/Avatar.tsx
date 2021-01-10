/* eslint-disable no-bitwise */
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import styles from '@/components/Avatar/Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  creator: {
    avatarSmall: string;
    nickname: string;
  };
}

const getUserNameFirstLetter = (name: string) => name.split('')[0].toLocaleUpperCase();

const stringToColor = function stringToColor(str: string) {
  let hash = 0;
  let color = '#';

  if (!str) {
    return `${color}333333`;
  }

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};

const Avatar: FunctionComponent<AvatarProps> = ({ creator }) => (
  <div className={styles.user_avatar} title={creator.nickname}>
    <Link className={styles['link']} to={`/@${creator.nickname}`}>
      {creator.avatarSmall ? (
        <img src={creator.avatarSmall} alt={creator.nickname} />
      ) : (
        <div
          className={styles.user_pseudo_avatar}
          style={{ backgroundColor: `${stringToColor(creator.nickname)}` }}
        >
          <span>{getUserNameFirstLetter(creator.nickname)}</span>
        </div>
      )}
    </Link>
  </div>
);

export default Avatar;
