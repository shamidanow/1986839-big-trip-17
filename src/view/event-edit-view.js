import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {slashesFullDate} from '../utils/event.js';
import {EVENT_TYPES} from '../const.js';
import {OFFERS} from '../mock/offers';
import {DESTINATIONS} from '../mock/destinations';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: ''
};

const createOfferTemplate = (offer, eventOffers) => {
  const prefix = offer.title.toLowerCase().replace(' ', '-');
  const checked = eventOffers.includes(offer.id) ? 'checked' : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${prefix}-${offer.id}"
          type="checkbox"
          name="event-offer-${prefix}"
          value="${offer.id}"
          ${checked}
      >
      <label class="event__offer-label" for="event-offer-${prefix}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createOffersTemplate = (eventTypeOffers, eventOffers) => eventTypeOffers.map((offer) => createOfferTemplate(offer, eventOffers)).join('');

const createEventTypeItemTemplate = (type, isChecked) => {
  const capitalizedValue = type[0].toUpperCase() + type.substring(1);

  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedValue}</label>
    </div>
  `;
};

const createEventTypesTemplate = (types, eventType) => (
  `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${types.map((type) => createEventTypeItemTemplate(type, type === eventType)).join('')}
    </fieldset>
  `
);

const createDestinationsTemplate = (destinations, eventDestination) => (
  `
    ${destinations.map((destination) => `<option value="${destination}" ${destination === eventDestination ? 'selected="selected"' : ''}></option>`).join('')}
  `
);

const createDestinationPhotosTemplate = (destinationPhotos) => (
  `
    ${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  `
);

const createEventEditTemplate = (data) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type, isEdit} = data;

  const dateFromSlashes = slashesFullDate(dateFrom);
  const dateToSlashes = slashesFullDate(dateTo);

  const buttonEditTemplate = isEdit
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  const eventTypeOffers =
    OFFERS.find((offer) => offer.type === type)
      ? OFFERS.find((offer) => offer.type === type).offers
      : [];
  const offersTemplate = createOffersTemplate(eventTypeOffers, offers);
  const eventTypesTemplate = createEventTypesTemplate(EVENT_TYPES, type);
  const destinationNames = DESTINATIONS.map((item) => item['name']);
  const destinationsTemplate = createDestinationsTemplate(destinationNames, destination.name);
  const destinationPhotosTemplate = createDestinationPhotosTemplate(destination.pictures);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${type !== '' ? `img/icons/${type}.png` : ''}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${eventTypesTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time  start" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromSlashes}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time  end" id="event-end-time-1" type="text" name="event-end-time" value="${dateToSlashes}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${isEdit ? '<button class="event__reset-btn delete" type="reset">Delete</button>' : '<button class="event__reset-btn cancel" type="reset">Cancel</button>'}
          ${buttonEditTemplate}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPhotosTemplate}
            </div>
          </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EventEditView extends AbstractStatefulView {
  #datepicker = null;

  constructor(event = BLANK_EVENT) {
    super();
    this._state = EventEditView.parseEventToState(event);

    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  setEditClickHandler = (callback) => {
    if ( this.element.querySelector('.event__rollup-btn') ) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
  };

  setCancelClickHandler = (callback) => {
    if ( this.element.querySelector('.event__reset-btn.cancel') ) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__reset-btn.cancel').addEventListener('click', this.#editClickHandler);
    }
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventEditView.parseStateToEvent(this._state));
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (event) => {
    this.updateElement(
      EventEditView.parseEventToState(event),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setCancelClickHandler(this._callback.editClick);
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #eventDestinationToggleHandler = (evt) => {
    evt.preventDefault();
    const targetValue = evt.target.value;
    const destinationValue = DESTINATIONS.find((destination) => destination.name === targetValue);
    this.updateElement({
      destination: destinationValue
    });
  };

  #eventOffersToggleHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = this._state.offers;
    const targetValue = parseInt(evt.target.value, 10);
    if ( evt.target.checked ) {
      selectedOffers.push(targetValue);
    } else {
      const myIndex = selectedOffers.indexOf(targetValue);
      if ( myIndex !== -1 ) {
        selectedOffers.splice(myIndex, 1);
      }
    }
    this._setState({
      offers: selectedOffers,
    });
  };

  #eventPriceToggleHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #setDateFromDatepicker = () => {
    if ( this._state.dateFrom ) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.event__input.event__input--time.start'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#dateFromChangeHandler
        }
      );
    }
  };

  #setDateToDatepicker = () => {
    if ( this._state.dateTo ) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.event__input.event__input--time.end'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#dateToChangeHandler
        }
      );
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeToggleHandler);

    this.element.querySelector('.event__field-group.event__field-group--destination')
      .addEventListener('change', this.#eventDestinationToggleHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#eventOffersToggleHandler);

    this.element.querySelector('.event__field-group.event__field-group--price')
      .addEventListener('change', this.#eventPriceToggleHandler);
  };

  static parseEventToState = (event) => ({...event,
    isEdit: Object.keys(event).length !== 0
  });

  static parseStateToEvent = (state) => {
    const event = {...state};

    delete event.isEdit;

    return event;
  };
}
