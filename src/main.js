import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view';
import InfoMainView from './view/info-main-view';
import InfoCostView from './view/info-cost-view';
import EventPresenter from './presenter/event-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic ekIyu26rcDDauPXj';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const eventsModel = new EventsModel(new EventsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const eventPresenter = new EventPresenter(sitePageBodyElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventPresenter.createEvent(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);

filterPresenter.init();
eventPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newEventButtonComponent, siteMainElement);
    newEventButtonComponent.setClickHandler(handleNewEventButtonClick);
  });
