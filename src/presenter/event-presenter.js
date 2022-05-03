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

    render(eventComponent, this.#eventListComponent.element);
  };
}
