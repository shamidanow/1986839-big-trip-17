import {render, remove} from '../framework/render.js';
import InfoMainView from '../view/info-main-view';
import InfoCostView from '../view/info-cost-view';

export default class EventInfoPresenter {
  #infoMainComponent = null;
  #infoCostComponent = null;
  #elementContainer = null;
  #eventsModel = null;

  constructor(elementContainer, eventsModel) {
    this.#elementContainer = elementContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#infoMainComponent = new InfoMainView(this.#eventsModel);
    this.#infoCostComponent = new InfoCostView(this.#eventsModel);

    render(this.#infoMainComponent, this.#elementContainer);
    render(this.#infoCostComponent, this.#elementContainer);
  };

  destroy = () => {
    remove(this.#infoMainComponent);
    remove(this.#infoCostComponent);
  };
}
