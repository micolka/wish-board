import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Avatar from '@/components/Avatar';
import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import styles from '@/pages/ProfilePage/ProfilePage.scss';

import { dataUser, dataWishes } from './data';

const ProfilePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const {mobileM, tablet, laptop, custom} = SCREEN_SIZES;
  return  (
    <div className={styles['profile-page']}>
      <div>
        <div>account name $ name</div>
        <div>
          <span>friends</span>
          <span>subscribes</span>
          <span>subscribers</span>
        </div>
        <button type="submit">subscribe</button> 
        <Avatar size="huge" user={dataUser} />
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{ [mobileM]: 1, [tablet]: 2, [laptop]: 3, [custom]: 4 }}>
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
