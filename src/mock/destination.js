import {getRandomInteger} from '../utils/common.js';
import {getRandomArrayElement} from '../utils/common.js';
import {DESTINATION_NAMES} from '../const.js';
import {DESTINATION_DESCRIPTIONS} from '../const.js';

export const generateDestination = () => ({
  description: getRandomArrayElement(DESTINATION_DESCRIPTIONS),
  name: getRandomArrayElement(DESTINATION_NAMES),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    }
  ]
});
