import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

import FriendsPage from './FriendsPage';
import ProfilePage from './ProfilePage';
import RegisterPage from './RegisterPage';
import SingleWish from './SingleWish';

const useRoutes = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/login" exact component={AuthPage} />
    <Route path="/register" exact component={RegisterPage} />
    <Route path="/friends" exact component={FriendsPage} />
    <Route path="/wish/:postId" exact component={SingleWish} />
    <Route path="/@:profileId" exact component={ProfilePage} />
    <Route exact path="/404" component={NotFoundPage} />
    <Route exact path="*">
      <Redirect to="/404" />
    </Route>
  </Switch>
);

export default useRoutes;
