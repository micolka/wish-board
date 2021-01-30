import { useState, useCallback, useEffect } from 'react';

import { USER_KEY } from '@/constants/';
import { IAvatar, IContextProps, IData, ILoginInput } from '@/types/AuthContext';

const useAuth = (): IData => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<IAvatar>({} as IAvatar);
  const [ready, setReady] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const login = useCallback((userData: ILoginInput) => {
    setId(userData.id);
    setUsername(userData.username);
    setAvatar(userData.avatar);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }, []);

  // const [logoutServer] = useMutation(LOGOUT_USER);

  const logout = useCallback(() => {
    setId(null);
    setAvatar({} as IAvatar);
    setUsername(null);
    localStorage.removeItem(USER_KEY);
    // logoutServer();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_KEY)!) as IContextProps;
    if (data?.id && data?.username) {
      login({ id: data.id, username: data.username, avatar: data.avatar });
    }
    setReady(true);
  }, [login]);

  return { username, avatar, login, logout, id, ready };
};

export default useAuth;
