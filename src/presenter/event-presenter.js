import {render} from '../render.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;

  #eventComponent = new EventSectionView();
  #eventListComponent = new EventListView();

  #eventPoints = [];

  init = (eventContainer, pointsModel) => {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#eventPoints = [...this.#pointsModel.points];

    render(this.#eventComponent, this.#eventContainer);
    render(new SortView(), this.#eventComponent.element);
    render(this.#eventListComponent, this.#eventComponent.element);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderEvent(this.#eventPoints[i]);
    }
  };

  #renderEvent = (event) => {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceCardToForm = () => {
      this.#eventListComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToCard = () => {
      this.#eventListComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
    });

    eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
    });

    render(eventComponent, this.#eventListComponent.element);
  };
}
