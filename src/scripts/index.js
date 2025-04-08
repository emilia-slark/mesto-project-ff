import {initialCards as dataCards} from "./cards.js";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.places__list');

function getCardElement(card) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCardElement(cardElement));
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  return cardElement;
}

function removeCardElement(cardElement) {
  cardElement.remove();
}

dataCards.forEach(item => {
  container.append(getCardElement(item));
});

// @TODO: две картинки на аватарке и ЛОГО