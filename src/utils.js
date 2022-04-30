import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date) => dayjs(date).format('MMM D');
const hoursMinutesDate = (date) => dayjs(date).format('hh:mm');
const yearMonthDate = (date) => dayjs(date).format('YYYY-MM-DD');
const fullDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const slashesFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export {getRandomInteger, humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, slashesFullDate};
