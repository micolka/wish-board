import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from '@/pages/AuthPage';
import Home from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const useRoutes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/auth" component={AuthPage} />
    <Route exact path="/404" component={NotFoundPage} />
    <Route exact path="*">
      <Redirect to="/404" />
    </Route>
  </Switch>
);

export default useRoutes;
