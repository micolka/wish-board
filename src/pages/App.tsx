import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { routeNamesMap } from '@/constants/';
import useAuth from '@/customHooks/auth.hook';
import Main from '@/pages/Main';

import useRoutes from './routes';

const handleChange = (routeName: string) => {
  if (routeName) {
    document.title = routeNamesMap[routeName] as string;
  }
};
const App = (): JSX.Element => {
  const history = useHistory();
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  useEffect(
    () =>
      history.listen(location => {
        handleChange(location.pathname);
      }),
    [history]
  );

  return (
    <Fragment>
      <Main>{routes}</Main>
    </Fragment>
  );
};

export default App;
