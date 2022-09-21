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
      name,
      img,
      height,
      id,
      weight,
      text,
      evolvesTo,
      color
    } = data;

    this.element.classList.add(`card--${color}`);

    this.element.innerHTML = `
      <div class="card__face card__face--front">
        <img src="${img}" class="card__img">
        <h2 class="card__title">${name}</h2>
        <div class="card__stats-container">
          <div class="card__stat">
            <p>Height</p>
            <p class="card__stat-value">${height/10}m</p>
          </div>
          <div class="card__stat">
            <p>Weight</p>
            <p class="card__stat-value">${weight/10}kg</p>
          </div>
        </div>
      </div>
      <div class="card__face card__face--back">
        <p class"card__subtitle">Description</p>
        <p class="card__description">${text}</p>
        <p class="card__subtitle">Evolution</p>
        <div class="card__evol-display">
          <div class="card__evol"> 
            <img src="${img}" class="card__img--sm">
            <p>${name}</p>
          </div>
          <div class="card__evol"> 
            <img src="${evolvesTo.img}" class="card__img--sm">
            <p>${evolvesTo.name}</p>
          </div>
        </div>
      </div>
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