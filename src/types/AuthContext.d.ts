export interface IData {
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string, tokenExpiration: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
