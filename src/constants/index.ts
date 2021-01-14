const routeNamesMap = {
  '/': 'Wishboard',
  '/login': 'Login',
  '/registration': 'Authefication',
  '/friends': 'Friends',
  '/404': 'Not Found Page',
};
const AUTH_TOKEN = 'auth-token';
const nameApp = 'WishBoard';
const loginConst = 'login';
const registrationConst = 'registration';
const friendsConst = 'friends';
const wishConst = 'wish';
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
  wishConst,
  registrationConst,
  SCREEN_SIZES,
};
