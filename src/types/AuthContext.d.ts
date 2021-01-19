export interface IData {
  token: string | null;
  id: string | null;
  avatar: IAvatar;
  username: string | null;
  login: (userData: ILoginInput) => void;
  logout: () => void;
  ready: boolean;
}
export interface IErrorsRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IErrorsLogin {
  username: string;
  password: string;
}
export interface IContextProps {
  token: string | null;
  id: string | null;
  username: string | null;
  avatar: IAvatar;
  login: (userData: ILoginInput) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export type IAvatar = {
  small: string | null;
  normal: string | null;
};
export interface ILoginInput {
  token: string | null;
  id: string | null;
  username: string | null;
  avatar: IAvatar;
}
