import dayjs from 'dayjs';

const humanizeDate = (date) => date !== null ? dayjs(date).format('MMM D') : '';
const hoursMinutesDate = (date) => date !== null ? dayjs(date).format('hh:mm') : '';
const yearMonthDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DD') : '';
const fullDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
const slashesFullDate = (date) => date !== null ? dayjs(date).format('DD/MM/YY HH:mm') : '';

export {humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, slashesFullDate};
