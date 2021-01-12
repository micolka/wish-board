import { useQuery } from '@apollo/client';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SmallWish from '@/components/SmallWish';
import styles from '@/pages/HomePage/HomePage.scss';
import FETCH_WISHES_QUERY from '@/pages/HomePage/query';
import { TDataWish, TQuery } from '@/types/data';

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const { loading, data } = useQuery(FETCH_WISHES_QUERY);
  const dataWishes = data?.getWishes as TDataWish[];

  return (
    <div className={styles['home-page']}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}>
        {loading ? (
          <h1>Loading wishes..</h1>
        ) : (
          <Masonry gutter="10px">
            {dataWishes && dataWishes?.map(elem => <SmallWish wishData={elem} key={elem.id} />)}
          </Masonry>
        )}
      </ResponsiveMasonry>
    </div>
  );
};
export default HomePage;
