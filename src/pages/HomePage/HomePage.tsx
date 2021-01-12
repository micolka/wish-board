import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import SmallWish from '@/components/SmallWish';
import styles from '@/pages/HomePage/HomePage.scss';

import { dataWishes } from './data';

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => (
  <div className={styles['home-page']}>
    {dataWishes.map(elem => (
      <SmallWish wishData={elem} key={elem.wishId} />
    ))}
  </div>
);
export default HomePage;
