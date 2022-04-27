import {render} from './render.js';
import FilterView from './view/filter-view.js';
import InfoMainView from './view/info-main-view';
import InfoCostView from './view/info-cost-view';
import EventPresenter from './presenter/event-presenter';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const eventPresenter = new EventPresenter();

render(new FilterView(), siteFilterElement);
render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);

eventPresenter.init(sitePageBodyElement);
