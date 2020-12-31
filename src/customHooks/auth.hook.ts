import { useState, useCallback, useEffect } from 'react';

import { IData } from '@/types/AuthContext';

const storageName = 'userData';

const useAuth = (): IData => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!) as IData;

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }
    setIsAuthenticated(true);
  }, [login]);

  return { login, logout, token, userId, isAuthenticated };
};

export default useAuth;
