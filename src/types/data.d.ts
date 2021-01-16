export type TGetWishes = {
  getWishes: TDataWish[];
};

export type TDataWish = {
  id: string;
  name: string;
  createdAt: string;
  price: TPrice;
  image: TImage;
  creator: TCreator;
  backgroundColor: string;
  active: [TActive];
  fulfilled: [TFulfilled];
  comments: [TComment];
  likes: [TLike];
  likeCount: number;
  commentCount: number;
  activeCount: number;
  fulfilledCount: number;
};

export type TCreator = {
  id: string;
  username: string;
  avatar: TAvatar;
};

export type TAvatar = {
  small: string;
  normal: string;
};
export type TPrice = {
  value: string;
  currency: string;
};
export type TImage = {
  small: string;
};
export type TLike = {
  id: string;
  createdAt: string;
  username: string;
};
export type TActive = {
  id: string;
  createdAt: string;
  username: string;
};
export type TFulfilled = {
  id: string;
  createdAt: string;
  username: string;
};
export type TComment = {
  id: string;
  createdAt: string;
  username: string;
  body: string;
};
