import { Grid, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import React, { FunctionComponent, HTMLAttributes, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { MODAL_NAME } from '@/constants';
import AuthContext from '@/context/AuthContext';
import styles from '@/pages/FriendsPage/FriendsPage.scss';
import { convertMonth, getDayBeforeBirthDay, nicksCompare } from '@/utils/sort';

interface IFriend {
  nickname: string;
  birthday: string;
  avatarSmall: string;
  daysToBirthday?: number;
}

const friends: IFriend[] = [
  {
    nickname: 'aklyaksa2020',
    birthday: '1407767771429',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
  {
    nickname: 'vika',
    birthday: '807267771429',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
  {
    nickname: 'masha',
    birthday: '1007267771429',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
  {
    nickname: 'katya',
    birthday: '107267771400',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
  {
    nickname: 'hena',
    birthday: '507267771429',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
  {
    nickname: 'Petya1999',
    birthday: '907267771429',
    avatarSmall:
      'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  },
];

const FriendsPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Array<IFriend>>([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    friends.map(elem => {
      const friend = elem;
      friend.daysToBirthday = getDayBeforeBirthDay(new Date(+friend.birthday));
      return friend;
    });
  }, []);

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results: Array<IFriend> = friends.filter((friend: IFriend) =>
      friend.nickname.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const loginSort = () => {
    const res = searchResults.sort((a: IFriend, b: IFriend) =>
      nicksCompare(a.nickname.toLowerCase(), b.nickname.toLowerCase())
    );

    setSearchResults([...res]);
  };

  const loginRevSort = () => {
    const res = searchResults.sort(
      (a: IFriend, b: IFriend) => -nicksCompare(a.nickname.toLowerCase(), b.nickname.toLowerCase())
    );

    setSearchResults([...res]);
  };

  const birthdaySort = () => {
    const res = searchResults.sort((a: IFriend, b: IFriend) => {
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
    const res = searchResults.sort((a: IFriend, b: IFriend) => {
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

  const changeSelectValue = (event: React.ChangeEvent<{ value: string }>) => {
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

  return (
    <div className={styles['friends-page']}>
      <div className={styles['friends-page-container']}>
        <div className={styles['friends-title']}>
          <h1>{username}</h1>
          <ArrowForwardIosIcon />
          <h2 className={styles['friends']}>{MODAL_NAME.friends}</h2>
        </div>
        <nav>
          <ul className={styles['friends-nav-list']}>
            <li>
              <Link to="/friends">{`${MODAL_NAME.friends} ${friends.length}`}</Link>
            </li>
            <li>
              <Link to="/friends">{MODAL_NAME.subscriptions}</Link>
            </li>
            <li>
              <Link to="/friends">{MODAL_NAME.subscribers}</Link>
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
            {searchResults.map((friend: IFriend) => (
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
