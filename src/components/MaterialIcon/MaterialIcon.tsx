import { FavoriteBorder, Add, Check, Comment } from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import {FunctionComponent, HTMLAttributes, useState} from 'react';

import styles from '@/components/MaterialIcon/MaterialIcon.scss';
import AddingWishCard from "@/components/AddingWishCard";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  iconName: 'heart' | 'active' | 'fulfilled' | 'comments';
  color: 'red' | 'orange' | 'blue' | 'green';
  count: number;
}

const userCollections:Array<string> = ['Разное','День Рождения', 'Для дома', 'Новый год'];

const MaterialIcon: FunctionComponent<IconProps> = ({ iconName, count, color }) => {

  return (
    <div className={classNames(styles.single_stat_container, styles[`stat_${color}`])}>
      {iconName === 'heart' ? <FavoriteBorder /> : ''}
      {iconName === 'active' ? <AddingWishCard userCollections={userCollections} state/> : ''}
      {iconName === 'fulfilled' ? <Check /> : ''}
      {iconName === 'comments' ? <Comment /> : ''}
      <span className={styles.stats_count}>{count}</span>
    </div>
  );
};


export default MaterialIcon;
