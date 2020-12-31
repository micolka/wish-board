import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from '@/pages/AuthPage';
import Home from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const useRoutes = (isAuthenticated: boolean): JSX.Element =>
  isAuthenticated ? (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/404" component={NotFoundPage} />
      <Route exact path="*">
        <Redirect to="/404" />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

export default useRoutes;
