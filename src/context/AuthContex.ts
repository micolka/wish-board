import { createContext } from 'react';

import { IContextProps } from '@/types/AuthContext';

const AuthContext = createContext({
  token: null,
  id: null,
  username: null,
  avatar: {
    small: null,
    normal: null,
  },
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
} as IContextProps);

export default AuthContext;
