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
  activeDelete: 'Удалить желание',
  fulfilledDelete: 'Удалить из исполненных',
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
};
