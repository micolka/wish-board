import { useLazyQuery } from '@apollo/client';
import {
  CircularProgress,
  createStyles,
  Grid,
  InputLabel,
  makeStyles,
  NativeSelect,
  TextField,
  Theme,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import React, { useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes, ChangeEvent, SetStateAction } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { MODAL_NAME } from '@/constants';
import { FETCH_FRIENDS_QUERY } from '@/graphql/query';
import styles from '@/pages/FriendsPage/FriendsPage.scss';
import { TGetFriends, TFriend } from '@/types/data';
import { convertMonth, getDayBeforeBirthDay, nicksCompare } from '@/utils/sort';

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

type TUsername = {
  nickname: string;
};

type TSingleWishProps = RouteComponentProps<TUsername> & HTMLAttributes<HTMLDivElement>;

const FriendsPage: FunctionComponent<TSingleWishProps> = ({ ...props }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { nickname } = props.match.params;
  // eslint-disable-next-line react/destructuring-assignment
  const categoryName = props.match.url.slice(nickname.length + 3);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<TFriend>>([]);

  const [getFriends, { data }] = useLazyQuery<TGetFriends>(FETCH_FRIENDS_QUERY, {
    variables: {
      usernameOwner: nickname,
      name: '',
    },
    fetchPolicy: 'network-only',
  });

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getFriends();
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, []);

  const friends = data?.getFriends as [TFriend];

  useEffect(() => {
    friends?.map(elem => {
      const friend = elem;
      friend.daysToBirthday = getDayBeforeBirthDay(new Date(+friend.birthday));
      return friend;
    });
  }, [friends]);

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results: Array<TFriend> = friends?.filter((friend: TFriend) =>
      friend.nickname.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, friends]);

  const loginSort = () => {
    const res = searchResults.sort((a: TFriend, b: TFriend) =>
      nicksCompare(a.nickname.toLowerCase(), b.nickname.toLowerCase())
    );

    setSearchResults([...res]);
  };

  const loginRevSort = () => {
    const res = searchResults.sort(
      (a: TFriend, b: TFriend) => -nicksCompare(a.nickname.toLowerCase(), b.nickname.toLowerCase())
    );

    setSearchResults([...res]);
  };

  const birthdaySort = () => {
    const res = searchResults.sort((a: TFriend, b: TFriend) => {
      if (a.daysToBirthday && b.daysToBirthday) {
        if (a.daysToBirthday < b.daysToBirthday) {
          return -1;
        }
        if (a.daysToBirthday > b.daysToBirthday) {
          return 1;
        }
      }
      return 0;
    });
    setSearchResults([...res]);
  };

  const birthdayRevSort = () => {
    const res = searchResults.sort((a: TFriend, b: TFriend) => {
      if (a.daysToBirthday && b.daysToBirthday) {
        if (a.daysToBirthday > b.daysToBirthday) {
          return -1;
        }
        if (a.daysToBirthday < b.daysToBirthday) {
          return 1;
        }
      }
      return 0;
    });
    setSearchResults([...res]);
  };

  const changeSelectValue = (event: ChangeEvent<{ value: string }>) => {
    switch (event.target.value) {
      case 'login':
        return loginSort();
      case 'loginRev':
        return loginRevSort();
      case 'birthday':
        return birthdaySort();
      default:
        return birthdayRevSort();
    }
  };

  if (!friends) {
    return (
      <div className={styles['profile-page']}>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['friends-page']}>
      <div className={styles['friends-page-container']}>
        <div className={styles['friends-title']}>
          <Link to={`/@${nickname}/`}>
            <h2>{nickname}</h2>
          </Link>
          <ArrowForwardIosIcon />
          <h2 className={styles['friends']}>{categoryName}</h2>
        </div>
        <nav>
          <ul className={styles['friends-nav-list']}>
            <li>
              <Link to={`/@${nickname}/friends`}>{`${MODAL_NAME.friends} ${friends.length}`}</Link>
            </li>
            <li>
              <Link to={`/@${nickname}/subscribes`}>{MODAL_NAME.subscriptions}</Link>
            </li>
            <li>
              <Link to={`/@${nickname}/subscribers`}>{MODAL_NAME.subscribers}</Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className={styles['search-sort-container']}>
            <Grid container spacing={1} alignItems="flex-end">
              <TextField
                style={{ width: '95%', marginBottom: '4px' }}
                id="input-with-icon-grid"
                onChange={handleChange}
                value={searchTerm}
                label="Поиск друзей"
              />
            </Grid>
            <div className={styles['sort-container']}>
              <InputLabel htmlFor="select">{MODAL_NAME.sort}</InputLabel>
              <NativeSelect id="select" onChange={changeSelectValue}>
                <option value="login">{MODAL_NAME.loginSort}</option>
                <option value="loginRev">{MODAL_NAME.loginSortRevert}</option>
                <option value="birthday">{MODAL_NAME.birthdaySort}</option>
                <option value="birthdayRev">{MODAL_NAME.birthdaySortRevert}</option>
              </NativeSelect>
            </div>
          </div>
          <div className={styles['friends-container']}>
            {searchResults?.map((friend: TFriend) => (
              <div className={styles['friend-container']}>
                <Link to="/@:profileId" className={styles['avatar-login-container']}>
                  <div className={styles['avatar-container']}>
                    <img
                      className={styles['avatar']}
                      alt={friend.nickname}
                      src={friend.avatarSmall}
                    />
                  </div>
                  <p className={styles['friend-login']}>{friend.nickname}</p>
                </Link>
                <PeopleIcon fill="color: #828282" className={styles['people-icon']} />
                <p className={styles['birthday-container']}>
                  <CakeIcon className={styles['cake-icon']} />
                  {new Date(+friend.birthday).getDate()}
                  -го
                  {convertMonth(new Date(+friend.birthday).getMonth())}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendsPage;
