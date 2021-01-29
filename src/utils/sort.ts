export const getDayBeforeBirthDay = (birthDate: Date): number => {
  const today = new Date();
  const birthDay = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (today.getTime() > birthDay.getTime()) {
    birthDay.setFullYear(birthDay.getFullYear() + 1);
  }

  return Math.floor((birthDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const convertMonth = (numberOfMonth: number): string => {
  const months = [
    ' января',
    ' февраля',
    ' марта',
    ' апреля',
    ' мая',
    ' июня',
    ' июля',
    ' августа',
    ' сентября',
    ' октября',
    ' ноября',
    ' декабря',
  ];
  return months[numberOfMonth];
};

export const nicksCompare = (a: string, b: string): number => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
