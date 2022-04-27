import {render} from './render.js';
import FilterView from './view/filter-view.js';
import InfoMainView from "./view/info-main-view";
import InfoCostView from "./view/info-cost-view";
import SortView from "./view/sort-view";
import ContentView from "./view/content-view";

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const siteEventElement = sitePageMainElement.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);
render(new SortView(), siteEventElement);
render(new ContentView(), siteEventElement);
