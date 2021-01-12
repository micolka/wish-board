import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SmallWish from '@/components/SmallWish';
import styles from '@/pages/HomePage/HomePage.scss';
import FETCH_WISHES_QUERY from '@/pages/HomePage/query';
import { TDataWish, TQuery } from '@/types/data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const HomePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const classes = useStyles();
  const { loading, data } = useQuery<TQuery>(FETCH_WISHES_QUERY);
  const dataWishes = data?.getWishes as TDataWish[];

  return (
    <div className={styles['home-page']}>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}>
          <Masonry gutter="10px">
            {dataWishes && dataWishes?.map(elem => <SmallWish wishData={elem} key={elem.id} />)}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};
export default HomePage;
