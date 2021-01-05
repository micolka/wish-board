import { createContext } from 'react';

import { IData } from '@/types/AuthContext';

const AuthContext = createContext({
  token: null,
  id: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
} as IData);

export default AuthContext;
