import {generateEvent} from '../mock/event.js';

export default class EventsModel {
  #events = Array.from({length: 10}, generateEvent);

  get events() {
    return this.#events;
  }
}
