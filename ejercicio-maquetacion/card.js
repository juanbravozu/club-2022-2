class Card {
  #events = new Map();
  element = document.createElement('article');

  constructor(data, parent = document) {
    this.data = data;
    this.img = data.img;
    this.element.classList.add('card');
    parent.appendChild(this.element);
    this.#addCardContent(data);
  }

  #addCardContent(data) {
    const {
      name
    } = data;

    this.element.innerHTML = `
      <h2>${name}</h2>
    `
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