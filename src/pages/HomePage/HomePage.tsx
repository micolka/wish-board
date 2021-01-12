import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SmallWish from '@/components/SmallWish';
import styles from '@/pages/HomePage/HomePage.scss';

import { dataWishes } from './data';

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['home-page']}>
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}>
      <Masonry gutter="10px">
        {dataWishes.map(elem => (
          <SmallWish wishData={elem} key={elem.wishId} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  </div>
);
export default HomePage;
