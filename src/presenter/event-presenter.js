import {render, RenderPosition, remove} from '../framework/render.js';
import {sortEventDay, sortEventTime, sortEventPrice} from '../utils/event.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import NoEventView from '../view/no-event-view';
import EventItemPresenter from './event-item-presenter';
import EventNewPresenter from './event-new-presenter.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #eventComponent = new EventSectionView();
  #eventListComponent = new EventListView();
  #noEventComponent = null;
  #sortComponent = null;

  #eventItemPresenter = new Map();
  #eventNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor(eventContainer, eventsModel, filterModel) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventListComponent.element, this.#handleViewAction);

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortEventDay);
      case SortType.TIME:
        return filteredEvents.sort(sortEventTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventPrice);
    }

    return filteredEvents;
  }

  init = () => {
    this.#renderEventSection();
  };

  createEvent = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
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
    this.#noEventComponent = new NoEventView(this.#filterType);
    render(this.#noEventComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearEventSection = ({resetSortType = false} = {}) => {
    this.#eventNewPresenter.destroy();
    this.#eventItemPresenter.forEach((presenter) => presenter.destroy());
    this.#eventItemPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

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
