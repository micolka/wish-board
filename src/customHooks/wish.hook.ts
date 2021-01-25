import { useState, useCallback } from 'react';

import { IAddWishWindowState } from '@/types/AddWishContext';

const useWish = (): IAddWishWindowState => {
  const [isAddWishWindowOpen, setOpen] = useState(false);

  const openAddWishWindow = useCallback(() => {
    setOpen(true);
  }, []);

  const closeAddWishWindow = useCallback(() => {
    setOpen(false);
  }, []);

  return { isAddWishWindowOpen, openAddWishWindow, closeAddWishWindow };
};

export default useWish;
