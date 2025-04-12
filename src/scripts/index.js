import {
  initialCards,
  getCardElement,
  removeCardElement,
  toggleLike
} from "./cards.js";

import {
  openModal,
  closeModal,
  setImageModal,
  setProfileModal,
  setModalAnimation,
  getFormModal
} from "./modal.js";

import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;

const container = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');



// Открытие попапов
document.addEventListener('click', (e) => {
  switch (e.target) {
    case buttonEditProfile:
      openModal(popupEditProfile);
      setProfileModal(formEditProfile, currentProfile);
      break;
    case buttonNewCard:
      openModal(popupNewCard);
      break;
  }
  if (e.target.classList.contains('popup__close')) {
    closeModal(e.target.closest('.popup'));
  }
});



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



// Обработка событий формы редактирования профиля
function handleFormProfileSubmit(e) {
  e.preventDefault();
  currentProfile.name.textContent = formEditProfile.name.value;
  currentProfile.description.textContent = formEditProfile.description.value;
  closeModal(popupEditProfile);
}
formEditProfile.form.addEventListener('submit', handleFormProfileSubmit);



// Объект формы новой карточки и ее элементы
const formNewCard = {
  form: getFormModal(popupNewCard),
};
formNewCard.name = formNewCard.form.querySelector('.popup__input_type_card-name');
formNewCard.link = formNewCard.form.querySelector('.popup__input_type_url');



// Обработка событий формы новой карточки
function handleFormCardSubmit(e) {
  e.preventDefault();
  container.prepend(getCardElement({
      name: formNewCard.name.value,
      link: formNewCard.link.value
    },
    cardTemplate));
  formNewCard.form.reset();
  closeModal(popupNewCard);
}
formNewCard.form.addEventListener('submit', handleFormCardSubmit);



// Открытие попапа с картинкой и удаление карточки
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__image')) {
    openModal(popupImage);
    setImageModal(popupImage, e.target.closest('.card'));
  } else if (e.target.classList.contains('card__delete-button'))
    removeCardElement(e.target.closest('.card'));
  else if (e.target.classList.contains('card__like-button')) toggleLike(e);
});

// Отображение карточек
initialCards.forEach(item => {
  container.append(getCardElement(item, cardTemplate));
});



setModalAnimation();