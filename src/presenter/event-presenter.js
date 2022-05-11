import {render, replace} from '../framework/render.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import NoEventView from '../view/no-event-view';

export default class EventPresenter {
  #eventContainer = null;
  #eventsModel = null;

  #eventComponent = new EventSectionView();
  #eventListComponent = new EventListView();

  #events = [];

  constructor(eventContainer, eventsModel) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#events = [...this.#eventsModel.events];

    this.#renderEventSection();
  };

  #renderEvent = (event) => {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setEditClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#eventListComponent.element);
  };

  #renderEventSection = () => {
    render(this.#eventComponent, this.#eventContainer);

    if (this.#events.length === 0) {
      render(new NoEventView(), this.#eventComponent.element);
    } else {
      render(new SortView(), this.#eventComponent.element);
      render(this.#eventListComponent, this.#eventComponent.element);

      for (const event of this.#events) {
        this.#renderEvent(event);
      }
    }
  };
}
