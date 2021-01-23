import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Favorite, Check, Add } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React, { useContext } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';

import AddingWishCard from '@/components/AddingWishCard';
import Avatar from '@/components/Avatar';
import Comments from '@/components/Comments/Comments';
import Price from '@/components/Price';
import StatsItem from '@/components/StatsItem/StatsItem';
import { STAT_NAME, STAT_COLOR } from '@/constants';
import AuthContext from '@/context/AuthContex';
import styles from '@/pages/SingleWish/SingleWish.scss';
import FETCH_WISH_QUERY from '@/pages/SingleWish/query';
import { TUser, TDataWish, TGetWish } from '@/types/data';

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
  const { loading, data } = useQuery<TGetWish>(FETCH_WISH_QUERY, {
    variables: {
      wishId,
      usernameOwner: nickname,
      usernameGuest: username,
    },
  });

  const wishData = data?.getWish as TDataWish;
  if (!loading && wishData?.active.length < 1) {
    const path = '/';
    history.push(path);
  }
  const goBack = () => {
    history.goBack();
  };
  const userWant = wishData?.active.length > 0 ? wishData?.active[0].user : ({} as TUser);

  if (loading) {
    return (
      <div className={styles['wish-page']}>
        <div className={classes.root}>
          <CircularProgress />
        </div>
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
              <img alt={wishData.name} className={styles['wish-img']} src={wishData.image.normal} />
            </div>
            <div className={styles['data-container']}>
              <div className={styles['data-container_top']}>
                <div className={styles['user']}>
                  <Avatar user={userWant} size="normal" />
                  <span className={styles['user-name']}>{userWant.username}</span>
                  хочет
                </div>
                <div className={styles['button-container']}>
                  <MoreVertIcon />
                </div>
              </div>
              <h2 className={styles['product-name']}>{wishData.name}</h2>
              <div className={styles['product-info-container']}>
                <span>{wishData.createdAt}</span>
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
                  wishId={wishData.id}
                  user={user}
                  color={STAT_COLOR.like}
                >
                  <Favorite className={styles['like-icon']} />
                </StatsItem>
                <AddingWishCard
                  nameModal="Добавляем в желания"
                  wishName={wishData.name}
                  wishId={wishId}
                >
                  <StatsItem
                    text={`${wishData.activeCount} хотят`}
                    statName={STAT_NAME.active}
                    isActiveStat={!!wishData.isActive}
                    wishId={wishData.id}
                    user={user}
                    color={STAT_COLOR.active}
                  >
                    <Add className={styles['add-icon']} />
                  </StatsItem>
                </AddingWishCard>
                <AddingWishCard
                  nameModal="Добавляем в исполненные"
                  wishName={wishData.name}
                  wishId={wishId}
                >
                  <StatsItem
                    text={`${wishData.fulfilledCount} исполнено`}
                    statName={STAT_NAME.fulfilled}
                    isActiveStat={!!wishData.isFulfilled}
                    wishId={wishData.id}
                    user={user}
                    color={STAT_COLOR.fulfilled}
                  >
                    <Check className={styles['check-icon']} />
                  </StatsItem>
                </AddingWishCard>
              </div>
              <Comments
                wishId={wishData.id}
                username={nickname}
                comments={wishData.active[0].comments}
                user={user}
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SingleWish;
