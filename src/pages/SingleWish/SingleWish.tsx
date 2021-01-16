import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Favorite, Add, Check } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';

import Comments from '@/components/Comments/Comments';
import Price from '@/components/Price';
import StatsItem from '@/components/StatsItem/StatsItem';
// import AuthContext from '@/context/AuthContex';
import styles from '@/pages/SingleWish/SingleWish.scss';
import FETCH_WISH_QUERY from '@/pages/SingleWish/query';
import { TDataWish, TGetWish } from '@/types/SingleWish';

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
  wishId: string;
};

type TSingleWishProps = RouteComponentProps<TWish> & HTMLAttributes<HTMLDivElement>;

const SingleWish: FunctionComponent<TSingleWishProps> = ({ ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { wishId } = props.match.params;
  const classes = useStyles();
  // const context = useContext(AuthContext);

  const { loading, data } = useQuery<TGetWish>(FETCH_WISH_QUERY, {
    variables: {
      wishId,
    },
  });
  const wishData = data?.getWish as TDataWish;
  const user = wishData?.creator;

  return (
    <div className={styles['wish-page']}>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles['wish-wrapper']}>
          <nav className={styles['wish-nav']}>
            <Link className={styles['wish-link']} to="/">
              <TrendingFlatIcon className={styles['arrow']} />
              Back
            </Link>
          </nav>
          <div className={styles['wish-content']}>
            <div className={styles['img-container']}>
              <Price price={wishData?.price} />
              <img alt={wishData.name} className={styles['wish-img']} src={wishData.image.normal} />
            </div>
            <div className={styles['data-container']}>
              <div className={styles['data-container_top']}>
                <div className={styles['user']}>
                  <div className={styles['user-avatar']}>
                    <img
                      alt={user.username}
                      className={styles['user-avatar_small']}
                      src={user.avatar.small}
                    />
                  </div>
                  <span className={styles['user-name']}>{user.username}</span>
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
                <StatsItem text={`${wishData.likeCount} нравится`}>
                  <Favorite className={styles['like-icon']} />
                </StatsItem>
                <StatsItem text={`${wishData.activeCount} хотят`}>
                  <Add className={styles['add-icon']} />
                </StatsItem>
                <StatsItem text={`${wishData.fulfilledCount} исполнено`}>
                  <Check className={styles['check-icon']} />
                </StatsItem>
              </div>
              <Comments comments={wishData.comments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleWish;
