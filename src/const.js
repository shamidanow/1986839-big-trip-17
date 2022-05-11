const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATION_NAMES = ['Amsterdam', 'Chamonix', 'Geneva'];
const DESTINATION_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Fusce tristique felis at fermentum pharetra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
];
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export {EVENT_TYPES, DESTINATION_NAMES, DESTINATION_DESCRIPTIONS, FilterType};
