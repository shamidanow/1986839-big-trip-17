import {render, RenderPosition} from '../framework/render.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import NoEventView from '../view/no-event-view';
import EventItemPresenter from './event-item-presenter';

export default class EventPresenter {
  #eventContainer = null;
  #eventsModel = null;

  #eventComponent = new EventSectionView();
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #events = [];

  constructor(eventContainer, eventsModel) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#events = [...this.#eventsModel.events];

    this.#renderEventSection();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderEvent = (event) => {
    const eventItemPresenter = new EventItemPresenter(this.#eventListComponent.element);
    eventItemPresenter.init(event);
  };

  #renderEvents = (from, to) => {
    this.#events
      .slice(from, to)
      .forEach((event) => this.#renderEvent(event));
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.#eventComponent.element);
    this.#renderEvents(0, this.#events.length);
  };

  #renderEventSection = () => {
    render(this.#eventComponent, this.#eventContainer);

    if (this.#events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
  };
}
