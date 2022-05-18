import dayjs from 'dayjs';

const humanizeDate = (date) => date !== null ? dayjs(date).format('MMM D') : '';
const hoursMinutesDate = (date) => date !== null ? dayjs(date).format('hh:mm') : '';
const yearMonthDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DD') : '';
const fullDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
const slashesFullDate = (date) => date !== null ? dayjs(date).format('DD/MM/YY HH:mm') : '';

const getEventDuration = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const allMinutes = date2.diff(date1, 'minutes');
  const allHours = Math.floor(allMinutes / 60);
  const days = Math.floor(allHours / 24);
  const hours = allHours - (days * 24);
  const minutes = allMinutes - (allHours * 60);

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

const isEventFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');
const isEventPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

export {humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, slashesFullDate, getEventDuration, isEventFuture, isEventPast};
