export interface IData {
  token: string | null;
  id: string | null;
  login: (userData: ILoginInput) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
export interface ILoginInput {
  token: string | null;
  id: string | null;
}
