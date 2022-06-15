import AbstractView from '../framework/view/abstract-view.js';
import {getEventDates, sortEventDay} from '../utils/event';

const createInfoMainTemplate = (events) => {
  const sortedEvents = [...events];
  sortedEvents.sort(sortEventDay);

  const firstEvent = sortedEvents[0];
  const lastEvent = sortedEvents[sortedEvents.length - 1];

  const firstDestination = firstEvent ? firstEvent.destination.name : '';
  const lastDestination = lastEvent ? lastEvent.destination.name : '';
  let infoTitle = '';
  if ( sortedEvents.length > 3 ) {
    infoTitle = `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
  }
  if ( sortedEvents.length > 1 && sortedEvents.length < 3 ) {
    infoTitle = sortedEvents.map(({ destination }) => `${destination.name}`).join(' &mdash; ');
  }
  if ( sortedEvents.length === 1 ) {
    infoTitle = `${firstDestination}`;
  }

  const eventDates = getEventDates(firstEvent ? firstEvent.dateFrom : null, lastEvent ? lastEvent.dateTo : null);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>

      <p class="trip-info__dates">${eventDates}</p>
    </div>`
  );
};

export default class InfoMainView extends AbstractView {
  #eventsModel = null;

  constructor(eventsModel) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createInfoMainTemplate(this.#eventsModel ? this.#eventsModel.events : []);
  }
}
