const routeNamesMap = {
  '/': 'WishBoard',
  '/login': 'Login',
  '/registration': 'Authefication',
  '/wish': 'Wish',
  '/friends': 'Friends',
  '/404': 'Not Found Page',
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
};
