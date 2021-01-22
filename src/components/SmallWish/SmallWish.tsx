import classNames from 'classnames';
import React, { useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import MaterialIcon from '@/components/MaterialIcon';
import Price from '@/components/Price';
import styles from '@/components/SmallWish/SmallWish.scss';
import WishImage from '@/components/WishImage';
import { STAT_NAME, STAT_COLOR } from '@/constants';
import { TDataWish } from '@/types/data';

interface WishProps extends HTMLAttributes<HTMLDivElement> {
  wishData: TDataWish;
}

const SmallWish: FunctionComponent<WishProps> = ({ wishData }) => {
  const [isStatsShown, setStatsShown] = useState<boolean | HTMLElement>(false);

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
          <WishImage
            imageUrl={wishData.image.small}
            name={wishData.name}
            color={wishData.backgroundColor}
          />
          <Link
            className={styles['link']}
            to={`/wish/@${wishData.active[0].user.username}/${wishData.id}`}
          >
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
            <MaterialIcon
              color={STAT_COLOR.like}
              iconName={STAT_NAME.like}
              wishName={wishData.name}
              count={wishData.likeCount}
              isActiveStat={!!wishData.isLike}
              wishId={wishData.id}
            />
            <MaterialIcon
              color={STAT_COLOR.active}
              iconName={STAT_NAME.active}
              wishName={wishData.name}
              count={wishData.activeCount}
              isActiveStat={!!wishData.isActive}
              wishId={wishData.id}
            />
            <MaterialIcon
              color={STAT_COLOR.fulfilled}
              iconName={STAT_NAME.fulfilled}
              wishName={wishData.name}
              count={wishData.fulfilledCount}
              isActiveStat={!!wishData.isFulfilled}
              wishId={wishData.id}
            />
            <MaterialIcon
              color={STAT_COLOR.comments}
              iconName={STAT_NAME.comments}
              wishName={wishData.name}
              nickname={wishData.active[0].user.username}
              count={wishData.active[0].commentCount}
              wishId={wishData.id}
            />
          </div>
        </div>
        <div className={styles.wish_description}>
          <Link className={styles['link']} to={`/@${wishData.active[0].user.username}`}>
            <Avatar user={wishData.active[0].user} size="normal" />
          </Link>
          <Link
            className={styles['link']}
            to={`/wish/@${wishData.active[0].user.username}/${wishData.id}`}
          >
            <span className={styles.wish_name}>{wishData.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallWish;
