declare type UserId = number;

export interface IImage {
  small: string;
  normal: string;
}
export interface IPrice {
  value: number;
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
