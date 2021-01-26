import { useLazyQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React, { Fragment, useContext, useEffect } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Redirect } from 'react-router-dom';

import SmallWish from '@/components/SmallWish';
import { SCREEN_SIZES } from '@/constants';
import AuthContext from '@/context/AuthContext';
import styles from '@/pages/HomePage/HomePage.scss';
import FETCH_WISHES_QUERY from '@/pages/HomePage/query';
import { TDataWish, TGetWishes } from '@/types/data';

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
  const { mobileM, tablet, laptop, custom } = SCREEN_SIZES;
  const { username } = useContext(AuthContext);
  const nameSearch = '';

  const [getWishes, { called, loading, data }] = useLazyQuery<TGetWishes>(FETCH_WISHES_QUERY, {
    variables: {
      name: nameSearch,
      usernameGuest: username,
    },
  });

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getWishes();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const dataWishes = data?.getWishes as TDataWish[];

  if (loading || !called) {
    return (
      <div className={styles['home-page']}>
        <div className={styles['home-page-wrapper']}>
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles['home-page']}>
      <div className={styles['home-page-wrapper']}>
        {dataWishes?.length > 0 ? (
          <Fragment>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ [mobileM]: 1, [tablet]: 2, [laptop]: 3, [custom]: 4 }}
            >
              <Masonry gutter="10px">
                {dataWishes.map(elem => (
                  <SmallWish wishData={elem} key={elem.id} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </Fragment>
        ) : (
          <Redirect to="/404" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
