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

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {EVENT_TYPES, FilterType, SortType, UserAction, UpdateType};
