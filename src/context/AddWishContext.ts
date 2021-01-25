import { createContext } from 'react';

import { IAddWishWindowState } from '@/types/AddWishContext';

const AddWishWindowContext = createContext({
  isAddWishWindowOpen: false,
  openAddWishWindow: () => {},
  closeAddWishWindow: () => {},
} as IAddWishWindowState);

export default AddWishWindowContext;
