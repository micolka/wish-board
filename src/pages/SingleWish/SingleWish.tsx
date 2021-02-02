import { useLazyQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Favorite, Check, Add } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React, { useContext, useEffect } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import Comments from '@/components/Comments/Comments';
import Price from '@/components/Price';
import StatsItem from '@/components/StatsItem/StatsItem';
import WishImage from '@/components/WishImage';
import { STAT_NAME, STAT_COLOR, MODAL_NAME } from '@/constants';
import AuthContext from '@/context/AuthContext';
import { FETCH_WISH_QUERY } from '@/graphql/query';
import styles from '@/pages/SingleWish/SingleWish.scss';
import { TUser, TDataWish, TGetWish } from '@/types/data';
import { formatDate } from '@/utils/formatters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

type TWish = {
  nickname: string;
  wishId: string;
};

type TSingleWishProps = RouteComponentProps<TWish> & HTMLAttributes<HTMLDivElement>;

const SingleWish: FunctionComponent<TSingleWishProps> = ({ ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { nickname, wishId } = props.match.params;
  const history = useHistory();
  const classes = useStyles();
  const { id, username, avatar } = useContext(AuthContext);
  const user = {
    id,
    username,
    avatar: {
      small: avatar.small,
      normal: avatar.small,
    },
  } as TUser;
  const [getWish, { called, loading, data }] = useLazyQuery<TGetWish>(FETCH_WISH_QUERY, {
    variables: {
      wishId,
      usernameOwner: nickname,
      usernameGuest: username,
    },
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  });

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getWish();
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, []);

  const wishData = data?.getWish as TDataWish;
  const goBack = () => {
    history.goBack();
  };
  const userWant = wishData?.active.length > 0 ? wishData?.active[0].user : ({} as TUser);

  if (loading || !called) {
    return (
      <div className={styles['wish-page']}>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (userWant.username !== nickname) {
    return (
      <div className={styles['wish-page']}>
        <Redirect to={`/@${nickname}`} />
      </div>
    );
  }

  return (
    <div className={styles['wish-page']}>
      {wishData?.active.length > 0 ? (
        <div className={styles['wish-wrapper']}>
          <nav className={styles['wish-nav']}>
            <div
              className={styles['wish-link']}
              onClick={() => goBack()}
              onKeyPress={() => {}}
              tabIndex={0}
              role="button"
            >
              <TrendingFlatIcon className={styles['arrow']} />
              Back
            </div>
          </nav>
          <div className={styles['wish-content']}>
            <div className={styles['img-container']}>
              <Price price={wishData?.price} />
              <WishImage
                imageUrl={wishData.image.small}
                name={wishData.name}
                color={wishData.backgroundColor}
              />
            </div>
            <div className={styles['data-container']}>
              <div className={styles['data-container_top']}>
                <div className={styles['user']}>
                  <Link
                    className={styles['user-link']}
                    to={`/@${wishData.active[0].user.username}`}
                  >
                    <Avatar user={userWant} size="normal" />
                    <span className={styles['user-name']}>{userWant.username}</span>
                  </Link>
                  хочет
                </div>
                <div className={styles['button-container']}>
                  <MoreVertIcon />
                </div>
              </div>
              <h2 className={styles['product-name']}>{wishData.name}</h2>
              <div className={styles['product-info-container']}>
                <div>{formatDate(wishData.active[0].createdAt)}</div>
                <a href={wishData.originURL} className={styles['link-container']}>
                  {wishData.originURL}
                  <CallMadeIcon className={styles['link-arrow']} />
                </a>
              </div>
              <p className={styles['product-description']}>{wishData.description}</p>
              <div className={styles['stats-container']}>
                <StatsItem
                  text={`${wishData.likeCount} нравится`}
                  isActiveStat={!!wishData.isLike}
                  statName={STAT_NAME.like}
                  modalTitle={wishData.isLike ? '' : ''}
                  wishName={wishData.name}
                  wishId={wishData.id}
                  user={user}
                  color={STAT_COLOR.like}
                >
                  <Favorite className={styles['like-icon']} />
                </StatsItem>
                <StatsItem
                  text={`${wishData.activeCount} хотят`}
                  statName={STAT_NAME.active}
                  modalTitle={wishData.isActive ? MODAL_NAME.activeDelete : MODAL_NAME.active}
                  isActiveStat={!!wishData.isActive}
                  wishId={wishData.id}
                  wishName={wishData.name}
                  user={user}
                  color={STAT_COLOR.active}
                >
                  <Add className={styles['add-icon']} />
                </StatsItem>
                <StatsItem
                  text={`${wishData.fulfilledCount} исполнено`}
                  statName={STAT_NAME.fulfilled}
                  wishName={wishData.name}
                  modalTitle={
                    wishData.isFulfilled ? MODAL_NAME.fulfilledDelete : MODAL_NAME.fulfilled
                  }
                  isActiveStat={!!wishData.isFulfilled}
                  wishId={wishData.id}
                  user={user}
                  color={STAT_COLOR.fulfilled}
                >
                  <Check className={styles['check-icon']} />
                </StatsItem>
              </div>
              <Comments
                wishId={wishData.id}
                usernameOwner={nickname}
                comments={wishData.active[0].comments}
                userGuest={user}
              />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default SingleWish;
