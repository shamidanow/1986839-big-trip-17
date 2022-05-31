import {render, RenderPosition, remove} from '../framework/render.js';
import {sortEventTime, sortEventPrice} from '../utils/event.js';
import {SortType, UpdateType, UserAction} from '../const.js';
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
  #noEventComponent = new NoEventView();
  #sortComponent = null;

  #eventItemPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(eventContainer, eventsModel) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortEventTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortEventPrice);
    }

    return this.#eventsModel.events;
  }

  init = () => {
    this.#renderEventSection();
  };

  #handleModeChange = () => {
    this.#eventItemPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventItemPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventSection();
        this.#renderEventSection();
        break;
      case UpdateType.MAJOR:
        this.#clearEventSection({resetSortType: true});
        this.#renderEventSection();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventSection();
    this.#renderEventSection();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderEvent = (event) => {
    const eventItemPresenter = new EventItemPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange);
    eventItemPresenter.init(event);
    this.#eventItemPresenter.set(event.id, eventItemPresenter);
  };

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearEventSection = ({resetSortType = false} = {}) => {
    const eventCount = this.events.length;

    this.#eventItemPresenter.forEach((presenter) => presenter.destroy());
    this.#eventItemPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderEventSection = () => {
    const events = this.events;
    const eventCount = events.length;

    render(this.#eventComponent, this.#eventContainer);

    if (eventCount === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#eventComponent.element);
    this.#renderEvents(events);
  };
}
