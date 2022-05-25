const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};
const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

export {EVENT_TYPES, FilterType, SortType};
