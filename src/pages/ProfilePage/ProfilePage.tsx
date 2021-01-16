import { Button } from '@material-ui/core';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Avatar from '@/components/Avatar';
import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import styles from '@/pages/ProfilePage/ProfilePage.scss';

import { dataUser, dataWishes } from './data';

const ProfilePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const { mobileM, tablet, laptop, custom } = SCREEN_SIZES;
  const { avatar, nickname, personalData } = dataUser;
  const { name, surname, patronymic } = personalData;
  const avaPops = {
    avatarSmall: avatar.small,
    nickname,
  };

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile_page_info-container']}>
        <div className={styles['profile_page_info-text']}>
          <div className={styles['profile_info-name']}>
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.symbol}>&mdash;</span>
            <span className={styles.name}>{`${name} ${surname} ${patronymic}`}</span>
          </div>
          <div className={styles['profile_info-socials']}>
            <span>Friends</span>
            <span>&bull;</span>
            <span>Subscribes</span>
            <span>&bull;</span>
            <span>Subscribers</span>
          </div>
          {/* // !! если не на своей странице название "Subscribe" иначе "Prefences" */}
          <Button variant="outlined" color="secondary" className={styles['profile_page-button']}>
            Prefences
          </Button>
        </div>
        <Avatar size="huge" user={avaPops} />
      </div>
      <div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ [mobileM]: 1, [tablet]: 2, [laptop]: 3, [custom]: 4 }}
        >
          <Masonry gutter="10px">
            {dataWishes.map(elem => (
              <SmallWish wishData={elem} key={elem.wishId} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
export default ProfilePage;
