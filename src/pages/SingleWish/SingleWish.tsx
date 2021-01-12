import { Favorite, Add, Check } from '@material-ui/icons';
import CallMadeIcon from '@material-ui/icons/CallMade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React, { FunctionComponent } from 'react';

import Comments from '@/components/Comments/Comments';
import Price from '@/components/Price';
import styles from '@/pages/SingleWish/SingleWish.scss';
import { IWish, IUser } from '@/types/SingleWish';

const user: IUser = {
  userId: 1,
  login: 'Vasya999',
  avatar: {
    small: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
    normal: 'https://99px.ru/sstorage/1/2011/06/image_11406111707363332889.jpg',
  },
};

const wishData: IWish = {
  wishId: 1233111,
  name: 'робот-пылесос',
  price: {
    value: 1000,
    currency: 'USD', // 'EUR', 'RUB', 'BYN'
  },
  creatorID: 1, // id создателя
  creationDate: '20.12.2020',
  description:
    'Оснащен датчиками 15 типов датчиков, с помощью которых робот-пылесос быстро ' +
    'адаптируются в любом помещении, определяя наличие препятствий. Регулирует подачу воды для ' +
    'повышения эффективности влажной уборки. Объем резервуара - 200 мл.',
  image: {
    small: 'url', // ссылка на изображение
    normal: 'https://mywishboard.com/thumbs/wish/l/i/p/1020x0_xdostxpetkpdqlhb_jpg_678a.jpg', // ссылка на изображение
  },
  backgroundColor: '#ffffff', // цвет фона на случай отсутсвия изображения
  originURL: 'https://xistore.by', // ссылка на интернет магазин либо сервис.
  statsData: {
    // id берутся из users
    liked: [1, 345, 5454], // юзеры, которым это желание нравится
    active: [1], // юзеры, которые хотят это желание
    fulfilled: [1], // юзеры, которе исполнили желание
  },
  tags: ['robot', 'сleaning'],
  visibility: 'all', // 'friends', 'meOnly'
  comments: [
    // комментарии на странице желания (хакер скоуп - опционально)
    {
      userId: 1,
      userAvatarUrl: 'https://avatarko.ru/img/kartinka/33/igra_Minecraft_32501.jpg',
      login: 'Vasya',
      text: 'класс',
      date: '20.12.2020',
    },
    {
      userId: 5,
      userAvatarUrl: 'https://avatarko.ru/img/kartinka/33/igra_Minecraft_32501.jpg',
      login: 'Vanya',
      text: 'норм',
      date: '22.12.2020',
    },
  ],
};

const SingleWish: FunctionComponent<IWish> = () => {
  const likes: Array<number> = wishData.statsData.liked;
  const adding: Array<number> = wishData.statsData.active;
  const { fulfilled } = wishData.statsData;

  return (
    <div className={styles['wish-page']}>
      <div className={styles['wish-wrapper']}>
        <nav className={styles['wish-nav']}>
          <TrendingFlatIcon className={styles['arrow']} />
          Назад
        </nav>
        <div className={styles['wish-content']}>
          <div className={styles['img-container']}>
            <Price price={wishData.price} />
            <img alt={wishData.name} className={styles['wish-img']} src={wishData.image.normal} />
          </div>
          <div className={styles['data-container']}>
            <div className={styles['data-container_top']}>
              <div className={styles['user']}>
                <div className={styles['user-avatar']}>
                  <img
                    alt={user.login}
                    className={styles['user-avatar_small']}
                    src={user.avatar.small}
                  />
                </div>
                <span className={styles['user-name']}>{user.login}</span>
                хочет
              </div>
              <div className={styles['button-container']}>
                <MoreVertIcon />
              </div>
            </div>
            <h2 className={styles['product-name']}>{wishData.name}</h2>
            <div className={styles['product-info-container']}>
              <span>{wishData.creationDate}</span>
              <a href={wishData.originURL} className={styles['link-container']}>
                {wishData.originURL}
                <CallMadeIcon className={styles['link-arrow']} />
              </a>
            </div>
            <p className={styles['product-description']}>{wishData.description}</p>
            <div className={styles['stats-container']}>
              <div className={styles['stats-item']}>
                <span className={styles['stats-icon-border']}>
                  <Favorite className={styles['like-icon']} />
                </span>
                <span>
                  {likes.length}
                  {' '}
                  нравится
                </span>
              </div>
              <div className={styles['stats-item']}>
                <span className={styles['stats-icon-border']}>
                  <Add className={styles['add-icon']} />
                </span>
                <span>
                  {adding.length}
                  {' '}
                  хотят
                </span>
              </div>
              <div className={styles['stats-item']}>
                <span className={styles['stats-icon-border']}>
                  <Check className={styles['check-icon']} />
                </span>
                <span>
                  {fulfilled.length}
                  {' '}
                  исполнено
                </span>
              </div>
            </div>
            <Comments
              comments={wishData.comments}
              price={wishData.price}
              wishId={wishData.wishId}
              image={wishData.image}
              name={wishData.name}
              originURL={wishData.originURL}
              statsData={wishData.statsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWish;
