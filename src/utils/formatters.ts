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

export const formatDate = (date: string): string =>
  new Date(parseInt(date, 10)).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const formatDateForCalendar = (date: string): string => {
  const d = new Date(parseInt(date, 10));
  const currDate = d.getDate();
  const currMonth = d.getMonth() + 1;
  const currYear = d.getFullYear();

  return currMonth < 9
    ? `${currYear}-0${currMonth}-${currDate}`
    : `${currYear}-${currMonth}-${currDate}`;
};

export const getUrlOrigin = (url: string): string => new URL(url).origin;
