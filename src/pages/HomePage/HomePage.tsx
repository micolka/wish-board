import React, {useContext} from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import AuthContext from '@/context/AuthContex';
import styles from '@/pages/HomePage/HomePage.scss';

import { dataWishes } from './data';

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const {mobileM, tablet, laptop, custom} = SCREEN_SIZES;
  const { token, id, logout } = useContext(AuthContext);
  console.log({ token, id });
  return (
    <div className={styles['home-page']}>
      <ResponsiveMasonry columnsCountBreakPoints={{ [mobileM]: 1, [tablet]: 2, [laptop]: 3, [custom]: 4 }}>
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
