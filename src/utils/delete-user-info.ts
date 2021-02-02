import { USER_KEY } from '@/constants/';

const deleteUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

export default deleteUser;
