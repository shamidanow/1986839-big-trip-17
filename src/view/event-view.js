import {createElement} from '../render.js';
import {humanizeDate} from '../utils.js';
import {hoursMinutesDate} from '../utils.js';
import {yearMonthDate} from '../utils.js';
import {fullDate} from '../utils.js';
import {OFFERS} from '../mock/offers';
import dayjs from 'dayjs';

const createOfferTemplate = (offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `;

const createOffersTemplate = (offers) => offers.map(createOfferTemplate).join('');

const createEventTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = point;

  const dateFromHumanize = dateFrom !== null
    ? humanizeDate(dateFrom)
    : '';

  const dateFromHoursMinutes = dateFrom !== null
    ? hoursMinutesDate(dateFrom)
    : '';

  const dateFromYearMonth = dateFrom !== null
    ? yearMonthDate(dateFrom)
    : '';

  const dateFromFull = dateFrom !== null
    ? fullDate(dateFrom)
    : '';

  const dateToHoursMinutes = dateTo !== null
    ? hoursMinutesDate(dateTo)
    : '';

  const dateToFull = dateTo !== null
    ? fullDate(dateTo)
    : '';

  //по примеру с https://stackoverflow.com/questions/66639760/dayjs-diff-between-two-date-in-day-and-hours
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  let hours = date2.diff(date1, 'hours');
  const days = Math.floor(hours / 24);
  hours = hours - (days * 24);
  const eventDuration = `${days}D ${hours}M`;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const pointTypeOffer = OFFERS.find((offer) => offer.type === type);
  const pointOffers = pointTypeOffer.offers.filter((v) => offers.some((v2) => v.id === v2));
  const offersTemplate = createOffersTemplate(pointOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFromYearMonth}">${dateFromHumanize}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${type !== '' ? `img/icons/${type}.png` : ''}" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFromFull}">${dateFromHoursMinutes}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateToFull}">${dateToHoursMinutes}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createEventTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
