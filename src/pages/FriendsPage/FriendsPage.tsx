import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  NativeSelect,
  TextField,
  Theme,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CakeIcon from '@material-ui/icons/Cake';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import React, { useContext, useEffect, useState } from 'react';
import type { FunctionComponent, HTMLAttributes, ChangeEvent, SetStateAction } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Avatar from '@/components/Avatar';
import { MODAL_NAME, NAMES_CATEGORIES } from '@/constants';
import AuthContext from '@/context/AuthContext';
import { SUBSCRIBE_USER } from '@/graphql/mutation';
import {
  FETCH_FRIENDS_QUERY,
  FETCH_SUBSCRIBERS_QUERY,
  FETCH_SUBSCRIPTIONS_QUERY,
} from '@/graphql/query';
import styles from '@/pages/FriendsPage/FriendsPage.scss';
import { TGetFriends, TFriend, TUser, TGetSubscribers, TGetSubscriptions } from '@/types/data';
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
    margin: {
      margin: theme.spacing(1),
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
  const { logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<TFriend>>([]);

  const [getFriends, { data: dataFriends }] = useLazyQuery<TGetFriends>(FETCH_FRIENDS_QUERY, {
    variables: {
      usernameOwner: nickname,
      name: '',
    },
    fetchPolicy: 'network-only',
  });

  const [getSubscribers, { data: dataSubscribers }] = useLazyQuery<TGetSubscribers>(
    FETCH_SUBSCRIBERS_QUERY,
    {
      variables: {
        usernameOwner: nickname,
        name: '',
      },
      fetchPolicy: 'network-only',
    }
  );

  const [getSubscriptions, { data: dataSubscriptions }] = useLazyQuery<TGetSubscriptions>(
    FETCH_SUBSCRIPTIONS_QUERY,
    {
      variables: {
        usernameOwner: nickname,
        name: '',
      },
      fetchPolicy: 'network-only',
    }
  );

  const [clickSubscribe] = useMutation(SUBSCRIBE_USER, {
    onError(error) {
      if (
        error?.message === 'Invalid/Expired token' ||
        error?.message === 'Authorization header must be provided'
      ) {
        logout();
      }
    },
    update() {
      if (categoryName === NAMES_CATEGORIES.categoryOne) {
        getFriends();
      } else if (categoryName === NAMES_CATEGORIES.categoryThree) {
        getSubscribers();
      } else if (categoryName === NAMES_CATEGORIES.categoryTwo) {
        getSubscriptions();
      }
    },
  });

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      if (categoryName === NAMES_CATEGORIES.categoryOne) {
        getFriends();
      } else if (categoryName === NAMES_CATEGORIES.categoryThree) {
        getSubscribers();
      } else if (categoryName === NAMES_CATEGORIES.categoryTwo) {
        getSubscriptions();
      }
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, [categoryName]);

  let friends = dataFriends?.getFriends as [TFriend];
  if (categoryName === NAMES_CATEGORIES.categoryThree) {
    friends = dataSubscribers?.getSubscribers as [TFriend];
  } else if (categoryName === NAMES_CATEGORIES.categoryTwo) {
    friends = dataSubscriptions?.getSubscriptions as [TFriend];
  }

  useEffect(() => {
    friends?.map(
      elem =>
        ({
          ...elem,
          daysToBirthday: getDayBeforeBirthDay(new Date(+elem.birthday)),
        } as TFriend)
    );
  }, [friends]);

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  const handleClickSub = (item: string) =>
    clickSubscribe({
      variables: {
        subscriptionUsername: item,
      },
    });

  useEffect(() => {
    const results: Array<TFriend> = friends?.filter((friend: TFriend) =>
      friend.username.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, friends]);

  const loginSort = () => {
    const res = searchResults.sort((a: TFriend, b: TFriend) =>
      nicksCompare(a.username.toLowerCase(), b.username.toLowerCase())
    );

    setSearchResults([...res]);
  };

  const loginRevSort = () => {
    const res = searchResults.sort(
      (a: TFriend, b: TFriend) => -nicksCompare(a.username.toLowerCase(), b.username.toLowerCase())
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
      <div className={styles['friends-page']}>
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
            <li className={categoryName === NAMES_CATEGORIES.categoryOne ? styles['active'] : ''}>
              <Link to={`/@${nickname}/${NAMES_CATEGORIES.categoryOne}`}>
                {`${MODAL_NAME.friends} ${
                  categoryName === NAMES_CATEGORIES.categoryOne ? friends.length : ''
                }`}
              </Link>
            </li>
            <li className={categoryName === NAMES_CATEGORIES.categoryTwo ? styles['active'] : ''}>
              <Link to={`/@${nickname}/${NAMES_CATEGORIES.categoryTwo}`}>
                {`${MODAL_NAME.subscriptions} ${
                  categoryName === NAMES_CATEGORIES.categoryTwo ? friends.length : ''
                }`}
              </Link>
            </li>
            <li className={categoryName === NAMES_CATEGORIES.categoryThree ? styles['active'] : ''}>
              <Link to={`/@${nickname}/${NAMES_CATEGORIES.categoryThree}`}>
                {`${MODAL_NAME.subscribers} ${
                  categoryName === NAMES_CATEGORIES.categoryThree ? friends.length : ''
                }`}
              </Link>
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
              <div className={styles['friend-container']} key={friend.username}>
                <Link to={`/@${friend.username}`} className={styles['avatar-login-container']}>
                  <div className={styles['avatar-container']}>
                    <Avatar
                      user={{ username: friend.username, avatar: friend.avatar } as TUser}
                      size="normal"
                    />
                  </div>
                  <p className={styles['friend-login']}>{friend.username}</p>
                </Link>
                {friend.isFriend && (
                  <PeopleIcon fill="color: #828282" className={styles['people-icon']} />
                )}
                <p className={styles['birthday-container']}>
                  <CakeIcon className={styles['cake-icon']} />
                  {new Date(+friend.birthday).getDate()}
                  -го
                  {convertMonth(new Date(+friend.birthday).getMonth())}
                </p>
                <IconButton
                  onClick={() => handleClickSub(friend.username)}
                  aria-label="delete"
                  className={classes.margin}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendsPage;
