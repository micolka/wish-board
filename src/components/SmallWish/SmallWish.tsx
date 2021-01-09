import classNames from 'classnames';
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/SmallWish/SmallWish.scss';
import { TDataWish } from '@/pages/HomePage/data';

import MaterialIcon from '../MaterialIcon';
import Price from '../Price';

interface WishProps extends HTMLAttributes<HTMLDivElement> {
  wishData: TDataWish;
}

const SmallWish: FunctionComponent<WishProps> = ({ wishData }) => {
  const [isStatsShown, setStatsShown] = React.useState<boolean | HTMLElement>(false);

  const hideStats = () => {
    setStatsShown(false);
  };

  const showStats = () => {
    setStatsShown(true);
  };

  return (
    <div className={styles.wish_wrapper}>
      <div className={styles.wish_container}>
        <div className={styles.wish_img} onMouseLeave={hideStats} onMouseEnter={showStats}>
          <Price price={wishData.price} />
          <img src={wishData.image.small} alt={wishData.name} />
          <div
            className={classNames(
              styles.wish_container_curtain,
              isStatsShown ? styles.wish_container_curtain_display : ''
            )}
          />
          <div
            className={classNames(
              styles.wish_stats_container,
              isStatsShown ? styles.wish_stats_container_display : ''
            )}
          >
            <MaterialIcon color="red" iconName="heart" count={wishData.statsData.likesCount} />
            <MaterialIcon color="orange" iconName="active" count={wishData.statsData.activeCount} />
            <MaterialIcon
              color="green"
              iconName="fulfilled"
              count={wishData.statsData.fulfilledCount}
            />
            <MaterialIcon
              color="blue"
              iconName="comments"
              count={wishData.statsData.commentsCount}
            />
          </div>
        </div>
        <div className={styles.wish_description}>
          <img src={wishData.creator.avatarSmall} alt={wishData.creator.nickname} />
          <span className={styles.wish_name}>{wishData.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SmallWish;
