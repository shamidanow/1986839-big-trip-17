import {createElement} from '../render.js';

const createEventSectionTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

export default class EventSectionView {
  #element = null;

  get template() {
    return createEventSectionTemplate();
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
