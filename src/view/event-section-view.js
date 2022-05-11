import AbstractView from '../framework/view/abstract-view.js';

const createEventSectionTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

export default class EventSectionView extends AbstractView {
  get template() {
    return createEventSectionTemplate();
  }
}
