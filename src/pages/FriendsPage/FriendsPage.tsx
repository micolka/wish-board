import { Grid, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CakeIcon from '@material-ui/icons/Cake';
import PeopleIcon from '@material-ui/icons/People';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import styles from '@/pages/FriendsPage/FriendsPage.scss';

const user = {
  login: 'Vasya999',
};

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
  const [searchResults, setSearchResults] = React.useState([]);

  const getDayBeforeBirthDay = (birthDate: Date) => {
    const today = new Date();
    const bday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (today.getTime() > bday.getTime()) {
      bday.setFullYear(bday.getFullYear() + 1);
    }

    return Math.floor((bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  friends.map(friend => {
    friend.daysToBirthday = getDayBeforeBirthDay(new Date(+friend.birthday));
    return friend;
  });

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results: any = friends.filter((friend: IFriend) =>
      friend.nickname.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const convertMonth = (numberOfMonth: number) => {
    const months = [
      ' января',
      ' февраля',
      ' марта',
      ' апреля',
      ' мая',
      ' июня',
      ' июля',
      ' августа',
      ' сентября',
      ' октября',
      ' ноября',
      ' декабря',
    ];
    return months[numberOfMonth];
  };

  const loginSort = () => {
    const res = searchResults.sort((a: IFriend, b: IFriend) => {
      if (a.nickname.toLowerCase() < b.nickname.toLowerCase()) {
        return -1;
      }
      if (a.nickname.toLowerCase() > b.nickname.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    setSearchResults([...res]);
  };

  const loginRevSort = () => {
    const res = searchResults.sort((a: IFriend, b: IFriend) => {
      if (a.nickname.toLowerCase() > b.nickname.toLowerCase()) {
        return -1;
      }
      if (a.nickname.toLowerCase() < b.nickname.toLowerCase()) {
        return 1;
      }
      return 0;
    });

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

  const changeSelectValue = (event: React.ChangeEvent<{ value: unknown }>) => {
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
          <h1>{user.login}</h1>
          <ArrowForwardIosIcon />
          <h2 className={styles['friends']}>Друзья</h2>
        </div>
        <nav>
          <ul className={styles['friends-nav-list']}>
            <li>
              <Link to="/friends">друзья {friends.length}</Link>
            </li>
            <li>
              <Link to="/friends">подписки</Link>
            </li>
            <li>
              <Link to="/friends">подписчики</Link>
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
              <InputLabel htmlFor="select">Отсортировать</InputLabel>
              <NativeSelect id="select" onChange={changeSelectValue}>
                <option value="login"> ↓ По логину</option>
                <option value="loginRev"> ↑ По логину</option>
                <option value="birthday"> ↓ По дням рождения</option>
                <option value="birthdayRev"> ↑ По дням рождения</option>
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
