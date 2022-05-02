import {getRandomInteger} from '../utils.js';
import {getRandomArrayElement} from '../utils';
import {POINT_TYPES} from '../const.js';
import {generateOffer} from './offer';
import {generateDestination} from './destination';
import dayjs from 'dayjs';

const generateDate = () => {
  const daysGap = getRandomInteger(0, 7);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

export const generatePoint = () => ({
  id: getRandomInteger(1, 10),
  basePrice: getRandomInteger(100, 1100),
  dateFrom: generateDate(),
  dateTo: generateDate(),
  destination: getRandomArrayElement(Array.from({length: 10}, generateDestination)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomArrayElement(Array.from({length: 20}, generateOffer)).offers,
  type: getRandomArrayElement(POINT_TYPES)
});
