import {getRandomInteger} from '../utils/common.js';
import {getRandomArrayElement} from '../utils/common.js';
import {EVENT_TYPES} from '../const.js';
import {OFFERS} from './offers';
import {generateDestination} from './destination';
import dayjs from 'dayjs';

const generateDate = (dayBegin, dayEnd) => {
  const daysGap = getRandomInteger(dayBegin, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

export const generateEvent = () => {
  const type = getRandomArrayElement(EVENT_TYPES);
  const eventTypeOffer = OFFERS.find((offer) => offer.type === type);
  const offerSelectedIds = [];
  if (eventTypeOffer.offers.length > 0) {
    //для тестовых данных сформируем до двух элементов offers
    const offerFirstId = getRandomArrayElement(eventTypeOffer.offers).id;
    const offerSecondId = getRandomArrayElement(eventTypeOffer.offers).id;
    offerSelectedIds.push(offerFirstId);
    if (offerFirstId !== offerSecondId) {
      offerSelectedIds.push(offerSecondId);
    }
  }

  return (
    {
      id: getRandomInteger(1, 10),
      basePrice: getRandomInteger(100, 1100),
      dateFrom: generateDate(0, 2),
      dateTo: generateDate(3, 5),
      destination: getRandomArrayElement(Array.from({length: 10}, generateDestination)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
      offers: offerSelectedIds,
      type: type
    }
  );
};
