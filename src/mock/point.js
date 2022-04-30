import {getRandomInteger} from '../utils.js';
import {POINT_TYPES} from '../const.js';
import {generateOffer} from './offer';
import {generateDestination} from './destination';
import dayjs from 'dayjs';

const getRandomDestination = () => {
  const destinations = Array.from({length: 10}, generateDestination);
  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const getRandomOffers = () => {
  const offers = Array.from({length: 20}, generateOffer);
  const randomIndex = getRandomInteger(0, offers.length - 1);

  return offers[randomIndex].offers;
};

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

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
  destination: getRandomDestination(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomOffers(),
  type: getRandomType()
});
