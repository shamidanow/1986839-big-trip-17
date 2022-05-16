import {render, replace} from '../framework/render.js';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

export default class EventItemPresenter {
  #eventListContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  constructor(eventListContainer) {
    this.#eventListContainer = eventListContainer;
  }

  init = (event) => {
    this.#event = event;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EventEditView(event);

    this.#eventComponent.setEditClickHandler(this.#handleEditClick);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setEditClickHandler(this.#handleFormSubmit);

    render(this.#eventComponent, this.#eventListContainer);
  };

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
