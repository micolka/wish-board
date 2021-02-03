import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  TextField,
} from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import AuthContext from '@/context/AuthContext';
import { UPDATE_USER } from '@/graphql/mutation';
import { FETCH_INFO_USER } from '@/graphql/query';
import styles from '@/pages/SettingsPage/SettingsPage.scss';
import { TGetInfoUserByName, TUser, TGetInfoUser } from '@/types/data';
import { formatDateForCalendar } from '@/utils/formatters';

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
  const { username, id, login, logout } = useContext(AuthContext);
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const [patronymicValue, setPatronymicValue] = useState('');
  const [dateOfBirthValue, setDateOfBirthValue] = useState('');
  const [urlAvatarValue, setUrlAvatarValue] = useState('');
  const [badUrl, setBadUrl] = useState(false);

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

  const [updateUserInfo] = useMutation(UPDATE_USER, {
    onError(err) {
      if (
        err?.message === 'Invalid/Expired token' ||
        err?.message === 'Authorization header must be provided'
      ) {
        logout();
      }
    },
  });

  const handleAvatarChange = () => {
    const checkImg = new Image();
    checkImg.src = urlAvatarValue;
    checkImg.onerror = () => {
      if (urlAvatarValue === '') {
        setBadUrl(false);
        return updateUserInfo({
          update() {
            login({
              id,
              username,
              avatar: {
                small: urlAvatarValue,
                normal: urlAvatarValue,
              },
            });
            setUrlAvatarValue('');
          },
          variables: {
            small: urlAvatarValue,
            normal: urlAvatarValue,
          },
        });
      }
      return setBadUrl(true);
    };
    checkImg.onload = () =>
      updateUserInfo({
        update() {
          login({
            id,
            username,
            avatar: {
              small: urlAvatarValue,
              normal: urlAvatarValue,
            },
          });
          setBadUrl(false);
          setUrlAvatarValue('');
        },
        variables: {
          small: urlAvatarValue,
          normal: urlAvatarValue,
        },
      });
  };

  const handleMainInfoChange = () =>
    updateUserInfo({
      variables: {
        name: nameValue,
        surname: surnameValue,
        patronymic: patronymicValue,
        dateOfBirth: dateOfBirthValue,
      },
    });

  const changeNameValue = (e: { currentTarget: { value: string } }): void => {
    setNameValue(e.currentTarget.value);
  };

  const changeSurnameValue = (e: { currentTarget: { value: string } }): void => {
    setSurnameValue(e.currentTarget.value);
  };

  const changePatronymic = (e: { currentTarget: { value: string } }): void => {
    setPatronymicValue(e.currentTarget.value);
  };

  const changeDateOfBirthValue = (e: { currentTarget: { value: string } }): void => {
    setDateOfBirthValue(Date.parse(e.currentTarget.value).toString());
  };

  const changeAvatarValue = (e: { currentTarget: { value: string } }): void => {
    setUrlAvatarValue(e.currentTarget.value);
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
            <TextField
              error={badUrl}
              helperText={badUrl ? 'Incorrect URL' : ''}
              onChange={changeAvatarValue}
              margin="dense"
              id="url"
              value={urlAvatarValue}
              label="URL for Avatar"
              type="text"
            />
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
                <TextField
                  onChange={changeNameValue}
                  label="Name"
                  defaultValue={personalData.name}
                />
                <TextField
                  onChange={changeSurnameValue}
                  label="Surname"
                  defaultValue={personalData.surname}
                />
                <TextField
                  onChange={changePatronymic}
                  label="Patronymic"
                  defaultValue={personalData.patronymic}
                />
              </div>
              <TextField
                id="date"
                onChange={changeDateOfBirthValue}
                label="Birthday"
                type="date"
                defaultValue={
                  personalData.dateOfBirth
                    ? formatDateForCalendar(personalData.dateOfBirth)
                    : '2020-02-20'
                }
              />
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
