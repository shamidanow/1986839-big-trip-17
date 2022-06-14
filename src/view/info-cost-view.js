import AbstractView from '../framework/view/abstract-view.js';
import {getEventOffersByType} from '../utils/event';

const createInfoCostTemplate = (events, offers) => {
  const totalCost = events.reduce((sum, event) => {
    const eventTypeOffers = getEventOffersByType(offers, event.type);
    const eventOffersSum = eventTypeOffers.reduce((acc, offer) => {
      if ( event.offers.includes(offer.id) ) {
        acc += offer.price;
      }
      return acc;
    }, 0);
    sum += event.basePrice + eventOffersSum;
    return sum;
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};


export default class InfoCostView extends AbstractView {
  #eventsModel = null;

  constructor(eventsModel) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createInfoCostTemplate(this.#eventsModel ? this.#eventsModel.events : [], this.#eventsModel ? this.#eventsModel.offers : []);
  }
}
