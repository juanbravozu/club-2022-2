window.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.querySelector('.card');
  const nameInput = document.querySelector('#name');
  const cardNumberInput = document.querySelector('#card');
  const monthInput = document.querySelector('#month');
  const yearInput = document.querySelector('#year');
  const cvcInput = document.querySelector('#cvc');
  const cardName = document.querySelector('#card-name');
  const cardNumber = document.querySelector('#card-number');
  const cardDate = document.querySelector('#card-date');

  nameInput.addEventListener('input', (e) => {
    cardName.innerText = e.target.value;
  });

  cardNumberInput.addEventListener('input', (e) => {
    cardNumber.innerText = e.target.value;
  });

  cvcInput.addEventListener('focus', () => cardContainer.classList.add('card--flipped'));
  cvcInput.addEventListener('blur', () => cardContainer.classList.remove('card--flipped'));

  monthInput.addEventListener('input', changeDateValue);
  yearInput.addEventListener('input', changeDateValue);

  function changeDateValue() {
    cardDate.innerText = `${monthInput.value || '00'}/${yearInput.value || '00'}`;
  }
});
