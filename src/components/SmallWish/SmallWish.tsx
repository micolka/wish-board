import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/SmallWish/SmallWish.scss';
import { TDataWish } from '@/pages/HomePage/data';

interface WishProps extends HTMLAttributes<HTMLDivElement> {
  wishData: TDataWish;
}

const SmallWish: FunctionComponent<WishProps> = ({ wishData }) => (
  <div className={styles.wish_wrapper}>
    <div className={styles.wish_container}>
      <div className={styles.wish_img}>
        <img src={wishData.image.small} alt={wishData.name} />
      </div>
      <div className={styles.wish_description}>
        <img src={wishData.creator.avatarSmall} alt={wishData.creator.nickname} />
        <span className={styles.wish_name}>{wishData.name}</span>
      </div>
    </div>
  </div>
);

export default SmallWish;
