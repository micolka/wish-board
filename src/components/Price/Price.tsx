import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/Price/Price.scss';

type TPrice = {
  value: number | null;
  currency: 'RUB' | 'EUR' | 'USD' | 'BYN' | string;
};

interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  price: TPrice;
}

const formatPriceString = (price: TPrice) => {
  const { value, currency } = price;
  if (!value) return '';
  let outString = value
    .toString()
    .split('')
    .reverse()
    .map((el, index) => {
      if ((index + 1) % 3 === 0) return ` ${el}`;
      return el;
    })
    .reverse()
    .join('');

  switch (currency) {
    case 'RUB':
      outString = `₽ ${outString}`;
      break;
    case 'EUR':
      outString = `€ ${outString}`;
      break;
    case 'USD':
      outString = `$ ${outString}`;
      break;
    case 'BYN':
      outString = `Br ${outString}`;
      break;
    default:
      outString = '';
  }

  return outString;
};

const Price: FunctionComponent<PriceProps> = ({ price }) => (
  <div className={styles.wish_price_container}>
    <div className={styles.wish_price}>{formatPriceString(price)}</div>
  </div>
);

export default Price;
