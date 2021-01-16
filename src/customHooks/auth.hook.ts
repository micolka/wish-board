import { useState, useCallback, useEffect } from 'react';

import { IData, ILoginInput } from '@/types/AuthContext';

const storageName = 'userData';

const useAuth = (): IData => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const login = useCallback((userData: ILoginInput) => {
    setToken(userData.token);
    setId(userData.id);
    setUsername(userData.username);
    localStorage.setItem(storageName, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName)!) as IData;
    if (data?.token && data?.id && data?.username) {
      login({ token: data.token, id: data.id, username: data.username });
    }
    setReady(true);
  }, [login]);

  return { token, username, login, logout, id, ready };
};

export default useAuth;
