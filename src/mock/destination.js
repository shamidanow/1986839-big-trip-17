import {getRandomInteger} from '../utils.js';
import {DESTINATION_NAMES} from '../const.js';
import {DESTINATION_DESCRIPTIONS} from '../const.js';

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_DESCRIPTIONS.length - 1);

  return DESTINATION_DESCRIPTIONS[randomIndex];
};

const generateName = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_NAMES.length - 1);

  return DESTINATION_NAMES[randomIndex];
};

export const generateDestination = () => ({
  description: generateDescription(),
  name: generateName(),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: generateDescription()
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: generateDescription()
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: generateDescription()
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: generateDescription()
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: generateDescription()
    }
  ]
});
