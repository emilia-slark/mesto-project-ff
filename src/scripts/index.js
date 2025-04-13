import {
  openModal,
  onCloseModal,
  setModalAnimation,
  onCloseModalOverlay
} from "./modal.js";

import { getCardElement } from "./card.js";
import { initialCards } from "./cards.js";
import '../pages/index.css';

// ========== Переменные ==========
const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardDesc = popupCard.querySelector('.popup__caption');

// Объект формы редактирования профиля и ее элементы
const formEditProfile = { 
  form: getFormModal(popupEditProfile), 
}; 
formEditProfile.name = formEditProfile.form.querySelector('.popup__input_type_name'); 
formEditProfile.description = formEditProfile.form.querySelector('.popup__input_type_description');

// Объект текущего (отображаемого) профиля
const currentProfile = { 
  profile: document.querySelector('.profile'), 
} 
currentProfile.name = currentProfile.profile.querySelector('.profile__title'); 
currentProfile.description = currentProfile.profile.querySelector('.profile__description');

// Объект формы новой карточки и ее элементы
const formNewCard = { 
  form: getFormModal(popupNewCard), 
}; 
formNewCard.name = formNewCard.form.querySelector('.popup__input_type_card-name'); 
formNewCard.link = formNewCard.form.querySelector('.popup__input_type_url'); 


// ========== Функции ==========
function getFormModal(modalElement) {
  return modalElement.querySelector('.popup__form');
}

function setImageModal(card) {
  popupCardImage.src = card.link;
  popupCardImage.alt = card.name;
  popupCardDesc.textContent = card.name;
  openModal(popupCard);
}

function setProfileModal(currentProfile) {
  formEditProfile.name.value = currentProfile.name.textContent;
  formEditProfile.description.value = currentProfile.description.textContent;
}

function handleFormProfileSubmit(e) {
  e.preventDefault();
  currentProfile.name.textContent = formEditProfile.name.value;
  currentProfile.description.textContent = formEditProfile.description.value;
  onCloseModal(popupEditProfile);
}

function handleFormCardSubmit(e) {
  e.preventDefault();
  container.prepend(getCardElement({
      name: formNewCard.name.value,
      link: formNewCard.link.value
    },
    cardTemplate,
    setImageModal));
  formNewCard.form.reset();
  onCloseModal(popupNewCard);
}


// ========== Обработчики событий ==========
buttonEditProfile.addEventListener('click', () => {
  openModal(popupEditProfile);
  setProfileModal(currentProfile);
});

buttonNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
});

document.querySelectorAll('.popup__close').forEach((buttonClose) => {
  buttonClose.addEventListener('click', (e) => {
    onCloseModal(e.target.closest('.popup'));
  });
});

formEditProfile.form.addEventListener('submit', handleFormProfileSubmit);
formNewCard.form.addEventListener('submit', handleFormCardSubmit);
document.addEventListener('click', onCloseModalOverlay);


// ========== Инициализация ==========
setModalAnimation();

// Отображение карточек
initialCards.forEach(item => {
  container.append(getCardElement(item, cardTemplate, setImageModal));
});