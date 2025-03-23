// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.places__list');

// @todo: Функция создания карточки

function getCardElement(card) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardElement);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  return cardElement;
}

// @todo: Функция удаления карточки

function removeCardElement(cardElement) {
  cardElement.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  container.append(getCardElement(item, removeCardElement));
});