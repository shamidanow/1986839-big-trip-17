import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

export default class EventItemPresenter {
  #eventListContainer = null;
  #changeData = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EventEditView(event);

    this.#eventComponent.setEditClickHandler(this.#handleEditClick);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setEditClickHandler(this.#handleCloseClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#eventListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
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

  #handleCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #handleFormSubmit = (event) => {
    this.#changeData(event);
    this.#replaceFormToCard();
  };
}
