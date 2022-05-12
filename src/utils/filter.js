import {FilterType} from '../const';
import {isEventFuture, isEventPast} from './event';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo)),
};

export {filter};
