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
import LoadingView from '../view/loading-view.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #eventComponent = new EventSectionView();
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #noEventComponent = null;
  #sortComponent = null;

  #eventItemPresenter = new Map();
  #eventNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

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
    this.#eventNewPresenter.init(callback, this.#eventsModel);
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventItemPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventItemPresenter.get(update.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventItemPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#eventNewPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#eventNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventItemPresenter.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#eventItemPresenter.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventItemPresenter.get(data.id).init(data, this.#eventsModel);
        break;
      case UpdateType.MINOR:
        this.#clearEventSection();
        this.#renderEventSection();
        break;
      case UpdateType.MAJOR:
        this.#clearEventSection({resetSortType: true});
        this.#renderEventSection();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    eventItemPresenter.init(event, this.#eventsModel);
    this.#eventItemPresenter.set(event.id, eventItemPresenter);
  };

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
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
    remove(this.#loadingComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderEventSection = () => {
    render(this.#eventComponent, this.#eventContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const events = this.events;
    const eventCount = events.length;

    if (eventCount === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#eventComponent.element);
    this.#renderEvents(events);
  };
}
