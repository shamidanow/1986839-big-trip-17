import {filter} from '../utils/filter.js';

export const generateFilter = (events) => Object.entries(filter).map(
  ([filterName, filterEvents]) => ({
    name: filterName,
    count: filterEvents(events).length,
  }),
);
