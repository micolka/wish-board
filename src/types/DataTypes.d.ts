export type TDataWish = {
  wishId: number;
  name: string;
  price: {
    value: number | null;
    currency: 'RUB' | 'EUR' | 'USD' | 'BYN' | string;
  };
  creator: {
    nickname: string;
    avatarSmall: string;
  };
  image: {
    small: string | null;
  };
  backgroundColor: string;
  statsData: {
    likesCount: number;
    activeCount: number;
    fulfilledCount: number;
    commentsCount: number;
  };
};
