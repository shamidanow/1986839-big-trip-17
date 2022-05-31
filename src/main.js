import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view';
import InfoMainView from './view/info-main-view';
import InfoCostView from './view/info-cost-view';
import EventPresenter from './presenter/event-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const eventPresenter = new EventPresenter(sitePageBodyElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);

render(new NewEventButtonView(), siteMainElement);
render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);

filterPresenter.init();
eventPresenter.init();
