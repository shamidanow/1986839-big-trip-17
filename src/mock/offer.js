import {getRandomInteger} from '../utils.js';
import {OFFER_TYPES} from '../const.js';
import {OFFER_TITLES} from '../const.js';

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, OFFER_TYPES.length - 1);

  return OFFER_TYPES[randomIndex];
};

const getRandomOfferTitle = () => {
  const randomIndex = getRandomInteger(0, OFFER_TITLES.length - 1);

  return OFFER_TITLES[randomIndex];
};

export const generateOffer = () => ({
  type: getRandomType(),
  offers: [
    {
      id: 1,
      title: getRandomOfferTitle(),
      price: getRandomInteger(0, 120)
    },
    {
      id: 2,
      title: getRandomOfferTitle(),
      price: getRandomInteger(0, 120)
    }
  ]
});
