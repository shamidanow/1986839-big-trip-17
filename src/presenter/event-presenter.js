import {render} from '../render.js';
import EventSectionView from '../view/event-section-view';
import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';

export default class EventPresenter {
  eventComponent = new EventSectionView();
  eventListComponent = new EventListView();

  init = (eventContainer, pointsModel) => {
    this.eventContainer = eventContainer;
    this.pointsModel = pointsModel;
    this.eventPoints = [...this.pointsModel.getPoints()];

    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement());

    render(this.eventListComponent, this.eventComponent.getElement());
    render(new EventEditView(this.eventPoints[0]), this.eventListComponent.getElement());

    for (let i = 1; i < this.eventPoints.length; i++) {
      render(new EventView(this.eventPoints[i]), this.eventListComponent.getElement());
    }
  };
}
