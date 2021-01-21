export type TGetWishes = {
  getWishes: TDataWish[];
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
  comments: [TComment];
  likes: [TLike];
  likeCount: number;
  activeCount: number;
  fulfilledCount: number;
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
  comments: [Comment];
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
