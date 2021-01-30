import { useLazyQuery } from '@apollo/client';
import { Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import { CakeOutlined } from '@material-ui/icons';
import React, { Fragment, useContext, useEffect } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import AddWishWindowContext from '@/context/AddWishContext';
import AuthContext from '@/context/AuthContext';
import { FETCH_INFO_USER } from '@/graphql/query';
import styles from '@/pages/ProfilePage/ProfilePage.scss';
import { TGetInfoUserByName, TUser, TGetInfoUser } from '@/types/data';
import { formatUserName } from '@/utils/formatters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

type TWish = {
  nickname: string;
};
type TSingleWishProps = RouteComponentProps<TWish> & HTMLAttributes<HTMLDivElement>;

const ProfilePage: FunctionComponent<TSingleWishProps> = ({ ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { nickname } = props.match.params;
  const classes = useStyles();
  const { mobileM, tablet, laptop, custom } = SCREEN_SIZES;
  const { openAddWishWindow } = useContext(AddWishWindowContext);

  const [getInfoUserByName, { called, loading, data }] = useLazyQuery<TGetInfoUserByName>(
    FETCH_INFO_USER,
    {
      variables: {
        usernameOwner: nickname,
      },
      fetchPolicy: 'network-only',
    }
  );

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getInfoUserByName();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const { username } = useContext(AuthContext);
  const dataInfo = data?.getInfoUserByName as TGetInfoUser;
  const infoUser = dataInfo?.user;
  const dataWishes = dataInfo?.wishes;

  const user = {
    id: infoUser?.id,
    username: infoUser?.username,
    avatar: infoUser?.avatar,
  } as TUser;

  const personalData = infoUser?.personalData;
  const fullUserName = formatUserName(personalData);

  const handleAddWish = () => {
    openAddWishWindow();
  };

  const handleUserSubscribe = () => {
    // eslint-disable-next-line no-console
    console.log(`user ${username as string} subscribes to ${infoUser?.username}`);
  };

  if (loading || !called) {
    return (
      <div className={styles['profile-page']}>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </div>
    );
  }
  if (!infoUser) {
    return (
      <div className={styles['profile-page']}>
        <div className={classes.root}>
          <Redirect to="/login" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['profile-page']}>
      {infoUser && (
        <Fragment>
          <div className={styles['profile_page_info-container']}>
            <div className={styles['profile_page_info-text']}>
              <div className={styles['profile_info-name']}>
                <Link className={styles['link']} to={`/@${nickname}`}>
                  <span className={styles.nickname}>{nickname}</span>
                </Link>
                {fullUserName && (
                  <Fragment>
                    <span className={styles.symbol}>&mdash;</span>
                    <span className={styles.name}>{fullUserName}</span>
                  </Fragment>
                )}
              </div>
              <div className={styles['profile_info-socials']}>
                {/* // !! создать страницу для спсков ниже. сделать переходы */}
                <Link to="/friends">
                  <span>Friends</span>
                </Link>
                <span>&bull;</span>
                <span>Subscribes</span>
                <span>&bull;</span>
                <span>Subscribers</span>
              </div>
              {username === infoUser?.username ? (
                <Link className={styles['link']} to="/settings">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={styles['profile_page-button']}
                  >
                    Prefences
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleUserSubscribe}
                  variant="outlined"
                  color="secondary"
                  className={styles['profile_page-button']}
                >
                  Subscribe
                </Button>
              )}
            </div>
            <Avatar size="huge" user={user} />
          </div>
          {personalData.dateOfBirth && (
            <div className={styles['birth_date_info-container']}>
              <div className={styles['birth_date_info-wrapper']}>
                <CakeOutlined />
                <span>{personalData?.dateOfBirth}</span>
              </div>
            </div>
          )}
          {dataWishes?.length > 0 ? (
            <div>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ [mobileM]: 1, [tablet]: 2, [laptop]: 3, [custom]: 4 }}
              >
                <Masonry gutter="10px">
                  {dataWishes.map(elem => (
                    <SmallWish wishData={elem} key={elem.id} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          ) : (
            <div className={styles['no_wishes_info-container']}>
              <div className={styles['no_wishes_info-text']}>No wishes added yet</div>
              {username === infoUser?.username ? (
                <Button
                  onClick={handleAddWish}
                  variant="outlined"
                  color="secondary"
                  className={styles['profile_page-button']}
                >
                  Add Wish
                </Button>
              ) : (
                ''
              )}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfilePage;
