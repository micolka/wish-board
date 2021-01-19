import { useState, useCallback, useEffect } from 'react';

import { AUTH_TOKEN } from '@/constants/';
import { IAvatar, IContextProps, IData, ILoginInput } from '@/types/AuthContext';

const useAuth = (): IData => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<IAvatar>({} as IAvatar);
  const [ready, setReady] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const login = useCallback((userData: ILoginInput) => {
    setToken(userData.token);
    setId(userData.id);
    setUsername(userData.username);
    setAvatar(userData.avatar);
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem(AUTH_TOKEN);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(AUTH_TOKEN)!) as IContextProps;
    if (data?.token && data?.id && data?.username) {
      login({ token: data.token, id: data.id, username: data.username, avatar: data.avatar });
    }
    setReady(true);
  }, [login]);

  return { token, username, avatar, login, logout, id, ready };
};

export default useAuth;
