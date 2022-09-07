class Card {
  #events = new Map();
  element = document.createElement('article');

  constructor(data, parent = document) {
    this.name = data.name;
    this.img = data.img;
    this.element.classList.add('card');
    parent.appendChild(this.element);
  }

  #addCardContent() {

  }

  addEvent(eventKey, callback) {
    this.#events.set(eventKey, callback.bind(this));
  }

  bindEvents() {
    this.#events.forEach((callback, eventKey) => {
      this.element.addEventListener(eventKey, callback);
    });
  }

  removeEvents() {
    this.#events.forEach((callback, eventKey) => {
      this.element.removeEventListener(eventKey, callback);
    });
  }
}