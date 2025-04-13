function getCardElement(card, cardTemplate, onOpenImagePopup) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__image').addEventListener('click', () => onOpenImagePopup(card));
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => onRemoveCardElement(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', onLike);

  return cardElement;
}

function onRemoveCardElement(cardElement) {
  cardElement.remove();
}

function onLike(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export { getCardElement };