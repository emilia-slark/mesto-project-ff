function getCardElement(myProfileId, card, cardTemplate, onOpenImagePopup, onOpenPopupDelete, onLike) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-counter').textContent = card.likes ? card.likes.length : 0;
  cardElement._id = card._id;

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  if (card.likes.some((item) => item._id === myProfileId))
    cardLikeButton.classList.add('card__like-button_is-active');

  cardElement.querySelector('.card__image').addEventListener('click', () => onOpenImagePopup(card));

  if (card.owner._id === myProfileId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => onOpenPopupDelete(cardElement));
  } else cardElement.querySelector('.card__delete-button').remove();

  cardLikeButton.addEventListener('click', (e) => {onLike(e, cardElement)});

  return cardElement;
}

export { getCardElement };