import { useState } from 'react';

import type { IUserForm, IValues } from '@/types/customHooks';

const useForm = (callback: () => void, initialState = {} as IValues): IUserForm => {
  const [values, setValues] = useState<IValues>(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  } as IUserForm;
};

export default useForm;
