import {render} from '../render.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import EventAddView from '../view/event-add-view';

export default class EventPresenter {
  eventComponent = new EventSectionView();
  eventListComponent = new EventListView();

  init = (eventContainer) => {
    this.eventContainer = eventContainer;

    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement());

    render(this.eventListComponent, this.eventComponent.getElement());
    render(new EventEditView(), this.eventListComponent.getElement());
    render(new EventAddView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  };
}
