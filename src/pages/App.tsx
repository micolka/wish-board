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

import Footer from '@/components/Footer';
import MenuBar from '@/components/MenuBar';
import { AUTH_TOKEN, routeNamesMap } from '@/constants/';
import AddWishWindowContext from '@/context/AddWishContext';
import AuthContext from '@/context/AuthContext';
import useAuth from '@/customHooks/auth.hook';
import useWish from '@/customHooks/wish.hook';
import { ILoginInput } from '@/types/AuthContext';

import useRoutes from './routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/',
});

// const httpLink = createHttpLink({
//   uri: 'https://graphql-wishboard-server.herokuapp.com/',
// });

const authLink = setContext((_, { headers }) => {
  const userData = JSON.parse(localStorage.getItem(AUTH_TOKEN)!) as ILoginInput;
  const token = userData ? userData.token : null;
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
  if (routeName?.indexOf('/wish/') !== -1) {
    document.title = routeNamesMap['/wish'];
  } else if (routeName?.indexOf('@') === -1) {
    document.title = routeNamesMap[routeName];
  }
};
const App = (): JSX.Element => {
  const history = useHistory();
  const { token, username, avatar, login, logout, id, ready } = useAuth();
  const { isAddWishWindowOpen, openAddWishWindow, closeAddWishWindow } = useWish();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  useEffect(
    () =>
      history.listen(location => {
        handleChange(location.pathname);
      }),
    [history]
  );

  if (!ready) {
    return <div>Loader...</div>;
  }
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          token,
          username,
          avatar,
          login,
          logout,
          id,
          isAuthenticated,
        }}
      >
        <AddWishWindowContext.Provider
          value={{ isAddWishWindowOpen, openAddWishWindow, closeAddWishWindow }}
        >
          <MenuBar />
          {routes}
          <Footer />
        </AddWishWindowContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
