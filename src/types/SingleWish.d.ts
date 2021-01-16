export type TGetWish = {
  getWish: TDataWish;
};

export type TDataWish = {
  id: string;
  name: string;
  createdAt: string;
  price: TPrice;
  image: TImage;
  creator: TCreator;
  backgroundColor: string;
  originURL: string;
  description: string;
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
  normal: string;
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
  avatar: {
    small: string;
  };
};

declare type UserId = number;

export interface IImage {
  small: string;
  normal: string;
}
export interface IPrice {
  value: string;
  currency: string;
}

export interface IUser {
  userId: UserId;
  login: string;
  avatar: IImage;
}
export interface IComment {
  userId: UserId;
  userAvatarUrl: string;
  text: string;
  login: string;
  date: string;
}

export interface IStatsData {
  liked: Array<number>;
  active: Array<number>;
  fulfilled: Array<number>;
}

export interface IWish {
  wishId: number;
  name: string;
  price: IPrice;
  creatorID: number;
  creationDate: string;
  image: IImage;
  backgroundColor: string;
  description: string;
  tags: Array<string>;
  visibility: string;
  originURL: string | undefined;
}
