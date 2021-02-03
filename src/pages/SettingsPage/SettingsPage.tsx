import { useLazyQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  TextField,
} from '@material-ui/core';
import React, { Fragment, useContext, useEffect } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import AuthContext from '@/context/AuthContext';
import { FETCH_INFO_USER } from '@/graphql/query';
import styles from '@/pages/SettingsPage/SettingsPage.scss';
import { TGetInfoUserByName, TUser, TGetInfoUser } from '@/types/data';

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

const SettingsPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const classes = useStyles();
  const { username } = useContext(AuthContext);

  const [getInfoUserByName, { called, error, loading, data }] = useLazyQuery<TGetInfoUserByName>(
    FETCH_INFO_USER,
    {
      variables: {
        usernameOwner: username,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, []);

  const dataInfo = data?.getInfoUserByName as TGetInfoUser;
  const infoUser = dataInfo?.user;

  const user = {
    id: infoUser?.id,
    username: infoUser?.username,
    avatar: infoUser?.avatar,
  } as TUser;

  const personalData = infoUser?.personalData;

  const handleAvatarChange = () => {
    // eslint-disable-next-line no-console
    console.log('change avatar');
  };

  const handleMainInfoChange = () => {
    // eslint-disable-next-line no-console
    console.log('change main info');
  };

  if (loading || !called) {
    return (
      <div className={styles['settings_page']}>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (
    error?.message === 'Invalid/Expired token' ||
    error?.message === 'Authorization header must be provided'
  ) {
    return (
      <div className={styles['settings_page']}>
        <div className={classes.root}>
          <Redirect to="/login" />
        </div>
      </div>
    );
  }

  if (!infoUser) {
    return (
      <div className={styles['settings_page']}>
        <div className={classes.root}>
          <Redirect to="/login" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['settings_page']}>
      {infoUser && (
        <Fragment>
          <div className={styles['settings_page_info-container']}>
            <div className={styles['settings_page_info-text']}>
              <div className={styles['settings_page_info-name']}>
                <Link className={styles['link']} to={`/@${username as string}`}>
                  <span className={styles.nickname}>{username}</span>
                </Link>
                <span className={styles.symbol}>&mdash;</span>
                <span className={styles.name}>Settings</span>
              </div>
            </div>
            <Avatar size="huge" user={user} />
            <Button
              onClick={handleAvatarChange}
              variant="outlined"
              color="secondary"
              className={styles['settings_page-button']}
            >
              Change avatar
            </Button>
          </div>
          <div className={styles['section-main']}>
            <span className={styles['sections-text']}>Main</span>
            <form noValidate autoComplete="off">
              <div className={styles['settings_page-name-block']}>
                <TextField label="Name" defaultValue={personalData.name} />
                <TextField label="Surname" defaultValue={personalData.surname} />
                <TextField label="Patronymic" defaultValue={personalData.patronymic} />
              </div>
              <TextField id="date" label="Birthday" type="date" defaultValue="2017-05-24" />
            </form>
            <Button
              onClick={handleMainInfoChange}
              variant="outlined"
              color="secondary"
              className={styles['settings_page-button']}
            >
              Save Changes
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SettingsPage;
