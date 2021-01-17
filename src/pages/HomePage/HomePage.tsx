import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import styles from '@/pages/HomePage/HomePage.scss';

import dataWishes from './data';

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const { mobileM, tablet, laptop, custom } = SCREEN_SIZES;

  return (
    <div className={styles['home-page']}>
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
  );
};

export default HomePage;
