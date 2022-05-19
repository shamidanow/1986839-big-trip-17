import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {sortEventTime, sortEventPrice} from '../utils/event.js';
import {SortType} from '../const.js';
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
  #eventItemPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedEvents = [];

  constructor(eventContainer, eventsModel) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#events = [...this.#eventsModel.events];
    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderEventSection();
  };

  #handleModeChange = () => {
    this.#eventItemPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventItemPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortEventTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortEventPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEventList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEvent = (event) => {
    const eventItemPresenter = new EventItemPresenter(this.#eventListComponent.element, this.#handleEventChange, this.#handleModeChange);
    eventItemPresenter.init(event);
    this.#eventItemPresenter.set(event.id, eventItemPresenter);
  };

  #renderEvents = (from, to) => {
    this.#events
      .slice(from, to)
      .forEach((event) => this.#renderEvent(event));
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearEventList = () => {
    this.#eventItemPresenter.forEach((presenter) => presenter.destroy());
    this.#eventItemPresenter.clear();
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
