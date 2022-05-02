import {getRandomInteger} from '../utils.js';
import {getRandomArrayElement} from '../utils';
import {OFFER_TYPES} from '../const.js';
import {OFFER_TITLES} from '../const.js';

export const generateOffer = () => ({
  type: getRandomArrayElement(OFFER_TYPES),
  offers: [
    {
      id: 1,
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomInteger(0, 120)
    },
    {
      id: 2,
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomInteger(0, 120)
    }
  ]
});
