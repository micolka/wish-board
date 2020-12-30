export interface IData {
  token: string;
  userId: string;
  login: (token: string, userId: string, tokenExpiration: string) => void;
  logout: () => void;
  isAuthenticated: string;
}
