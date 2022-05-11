import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view';
import FilterView from './view/filter-view.js';
import InfoMainView from './view/info-main-view';
import InfoCostView from './view/info-cost-view';
import EventPresenter from './presenter/event-presenter';
import EventsModel from './model/events-model';
import {generateFilter} from './mock/filter.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const eventsModel = new EventsModel();
const eventPresenter = new EventPresenter(sitePageBodyElement, eventsModel);

const filters = generateFilter(eventsModel.events);

render(new NewEventButtonView(), siteMainElement);
render(new FilterView(filters), siteFilterElement);
render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);

eventPresenter.init();
