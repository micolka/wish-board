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
import { routeNamesMap } from '@/constants/';
import AddWishWindowContext from '@/context/AddWishContext';
import AuthContext from '@/context/AuthContext';
import useAuth from '@/customHooks/auth.hook';
import useWish from '@/customHooks/wish.hook';

import useRoutes from './routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

// const httpLink = createHttpLink({
//   uri: 'https://graphql-wishboard-server.herokuapp.com/graphql',
//   credentials: 'include',
// });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
  } as ApolloLink,
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Wish: {
        fields: {
          active: {
            merge: false,
          },
          likes: {
            merge: false,
          },
        },
      },
      Active: {
        fields: {
          comments: {
            merge: false,
          },
        },
      },
    },
  }),
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
  const { username, avatar, login, logout, id, ready } = useAuth();
  const { isAddWishWindowOpen, openAddWishWindow, closeAddWishWindow } = useWish();
  const isAuthenticated = !!username;
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
