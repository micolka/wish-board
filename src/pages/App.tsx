import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MenuBar from '@/components/MenuBar';
import { AUTH_TOKEN, routeNamesMap } from '@/constants/';
import AuthContext from '@/context/AuthContex';
import useAuth from '@/customHooks/auth.hook';

import useRoutes from './routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    } as ApolloLink,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const handleChange = (routeName: string) => {
  if (routeName && routeName.indexOf('@') !== 1) {
    document.title = routeNamesMap[routeName] as string;
  }
};
const App = (): JSX.Element => {
  const history = useHistory();
  const { token, login, logout, id, isAuthenticated } = useAuth();
  const routes = useRoutes();
  useEffect(
    () =>
      history.listen(location => {
        handleChange(location.pathname);
      }),
    [history]
  );
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          id,
          isAuthenticated,
        }}
      >
        <MenuBar>{routes}</MenuBar>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
