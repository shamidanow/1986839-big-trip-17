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

const sortEventTime = (eventA, eventB) => {
  const date1A = dayjs(eventA.dateFrom);
  const date2A = dayjs(eventA.dateTo);
  const durationEventA = date2A.diff(date1A);

  const date1B = dayjs(eventB.dateFrom);
  const date2B = dayjs(eventB.dateTo);
  const durationEventB = date2B.diff(date1B);

  return durationEventB - durationEventA;
};

const sortEventPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export {humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, slashesFullDate, getEventDuration, isEventFuture, isEventPast, sortEventTime, sortEventPrice};
