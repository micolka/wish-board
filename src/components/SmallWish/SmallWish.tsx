import classNames from 'classnames';
import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import styles from '@/components/SmallWish/SmallWish.scss';
import { TDataWish } from '@/pages/HomePage/data';

import Avatar from '../Avatar';
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
          <img src={wishData.image.small} alt={wishData.name} />
          <Link className={styles['link']} to={`/wish/${wishData.wishId}`}>
            <div
              className={classNames(
                styles.wish_container_curtain,
                isStatsShown ? styles.wish_container_curtain_display : ''
              )}
            />
          </Link>
          <Price price={wishData.price} />
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
          <Avatar creator={wishData.creator} />
          <Link className={styles['link']} to={`/wish/${wishData.wishId}`}>
            <span className={styles.wish_name}>{wishData.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallWish;
