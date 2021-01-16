import { createContext } from 'react';

import { IContextProps } from '@/types/AuthContext';

const AuthContext = createContext({
  token: null,
  id: null,
  username: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
} as IContextProps);

export default AuthContext;
