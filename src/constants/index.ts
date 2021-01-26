const routeNamesMap: IConstant = {
  '/': 'WishBoard',
  '/login': 'Login',
  '/registration': 'Authefication',
  '/wish': 'Wish',
  '/friends': 'Friends',
  '/404': 'Not Found Page',
};

export interface IConstant {
  [index: string]: string;
}

const visibility: IConstant = {
  all: 'Видно всем',
  friends: 'Друзьям',
  meOnly: 'Только мне',
};

const MODAL_NAME: IConstant = {
  active: 'Добавляем в желания',
  fulfilled: 'Добавляем в исполненные',
};

const STAT_NAME: IConstant = {
  like: 'heart',
  active: 'add',
  fulfilled: 'check',
  comments: 'comments',
};

const STAT_COLOR: IConstant = {
  like: 'red',
  active: 'orange',
  fulfilled: 'green',
  comments: 'blue',
};

const AUTH_TOKEN = 'userData';
const nameApp = 'myWishBoard';
const loginConst = 'login';
const registrationConst = 'registration';
const friendsConst = 'friends';
const addWishConst = 'add wish';
const SCREEN_SIZES = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  custom: 1280,
  laptopS: 1366,
  laptopL: 1440,
  desktop: 2560,
};

const addwish: IConstant = {
  IWant: 'Я хочу...',
  name: 'Название',
  description: 'Описание',
  picture: 'Изображение или цветной фон',
  cost: 'Стоимость?',
  currency: 'Валюта',
  rub: 'руб',
  site: 'Ссылка на сайт',
  collection: 'Добавить в колекцию',
  tags: 'Теги',
  cancel: 'Отмена',
  want: 'ХОЧУ',
  addUrl: 'Вставьте ссылку на изображение',
  url: 'Ссылка',
  send: 'Отправить',
  badUrl: 'Неверная ссылка',
};

const gradientsColor: Array<string> = [
  'linear-gradient(0deg, rgb(191, 90, 224) 0%, rgb(168, 17, 218) 100%) rgb(191, 90, 224)',
  'linear-gradient(0deg, rgb(230, 92, 0) 0%, rgb(249, 212, 35) 100%) rgb(230, 92, 0)',
  'linear-gradient(0deg, rgb(200, 78, 137) 0%, rgb(241, 95, 121) 100%) rgb(200, 78, 137)',
  'linear-gradient(0deg, rgb(255, 224, 0) 0%, rgb(121, 159, 12) 100%) rgb(255, 224, 0)',
  'linear-gradient(0deg, rgb(151, 150, 240) 0%, rgb(251, 199, 212) 100%) rgb(151, 150, 240)',
  'linear-gradient(0deg, rgb(22, 34, 42) 0%, rgb(58, 96, 115) 100%) rgb(22, 34, 42)',
  'linear-gradient(0deg, rgb(236, 0, 140) 0%, rgb(252, 103, 103) 100%) rgb(236, 0, 140)',
  'linear-gradient(0deg, rgb(255, 239, 186) 0%, rgb(255, 255, 255) 100%) rgb(255, 239, 186)',
  'linear-gradient(0deg, rgb(26, 41, 128) 0%, rgb(38, 208, 206) 100%) rgb(26, 41, 128)',
];

export {
  routeNamesMap,
  AUTH_TOKEN,
  nameApp,
  loginConst,
  friendsConst,
  addWishConst,
  registrationConst,
  SCREEN_SIZES,
  visibility,
  MODAL_NAME,
  STAT_NAME,
  STAT_COLOR,
  addwish,
  gradientsColor,
};
