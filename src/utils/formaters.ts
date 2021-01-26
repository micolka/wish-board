import { TPersonalData } from '@/types/data';

export const formatUserName = (personalData: TPersonalData): string => {
  if (personalData) {
    const { name, surname, patronymic } = personalData;
    return `${!name ? '' : name} ${!surname ? '' : surname} ${
      !patronymic ? '' : patronymic
    }`.trim();
  }
  return '';
};

export const formatDate = (): string => '';
