export type TGetInfoUser = {
  wishes: TDataWish[];
  user: TUserFull;
};

export type TUserFull = {
  id: string;
  email: string;
  token: string;
  username: string;
  avatar: TAvatar;
  createdAt: string;
  personalData: TPersonalData;
  socialNetworks: TSocialNetworks;
  connectionsLists: TConnectionsLists;
  userWishes: TUserWishes;
};

export type TPersonalData = {
  name: string;
  surname: string;
  patronymic: string;
  dateOfBirth: string;
  hideDate: string;
  hideYear: string;
};
export type TSocialNetworks = {
  facebok: string;
  vk: string;
  odnoklassniki: string;
};
export type TConnectionsLists = {
  friends: [string];
  subscriptions: [string];
  subscribers: [string];
};
export type TUserWishes = {
  reserved: [TReserved];
};
export type TReserved = {
  wish: string;
  user: string;
};

export type TGetWishes = {
  getWishes: TDataWish[];
};

export type TGetWishByUserName = {
  getWishByUserName: TDataWish[];
};

export type TGetInfoUserByName = {
  getInfoUserByName: TGetInfoUser;
};

export type TGetWish = {
  getWish: TDataWish;
};

export type TDataWish = {
  id: string;
  name: string;
  createdAt: string;
  price: TPrice;
  image: TImage;
  backgroundColor: string;
  originURL: string;
  description: string;
  active: [TActive];
  likes: [TLike];
  likeCount: number;
  activeCount: number;
  fulfilledCount: number;
  isLike: boolean;
  isActive: boolean;
  isFulfilled: boolean;
};

export type TPrice = {
  value: string;
  currency: string;
};

export type TImage = {
  small: string;
  normal: string;
};
export type TLike = {
  id: string;
  createdAt: string;
  user: TUser;
};
export type TActive = {
  id: string;
  createdAt: string;
  visibility: string;
  fulfilled: boolean;
  user: TUser;
  comments: [TComment];
  commentCount: number;
};

export type TUser = {
  id: string;
  username: string;
  avatar: TAvatar;
};

export type TAvatar = {
  small: string;
  normal: string;
};

export type TComment = {
  id: string;
  createdAt: string;
  body: string;
  user: TUser;
};

export type TUserComment = {
  id: string | null;
  login: string | null;
  avatar: TImageAvatar;
};

export type TImageAvatar = {
  small: string | null;
};

export type TGetFriends = {
  getFriends: TFriend[];
};

export type TGetSubscribers = {
  getSubscribers: TFriend[];
};

export type TGetSubscriptions = {
  getSubscriptions: TFriend[];
};

export type TFriend = {
  isFriend: boolean;
  username: string;
  birthday: string;
  avatar: TAvatar;
  daysToBirthday: number;
};
