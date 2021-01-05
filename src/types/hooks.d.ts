export interface IUserForm {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  values: IValues;
}

export interface IValues {
  username: string;
  password: string;
}
