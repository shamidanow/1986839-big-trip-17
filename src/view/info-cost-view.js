import {createElement} from '../render.js';

const createInfoCostTemplate = () => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`
);

export default class InfoCostView {
  #element = null;

  get template() {
    return createInfoCostTemplate();
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
