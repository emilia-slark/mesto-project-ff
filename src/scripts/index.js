import {
  openModal,
  onCloseModal,
  setModalAnimation,
  onCloseModalOverlay,
} from "./modal.js";

import {
  fetchUserData,
  fetchCardItems,
  updateUserProfile,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
  postAvatar,
} from "./api.js";

import { getCardElement } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import "../pages/index.css";

// ========== Переменные ==========
const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".places__list");
const popupCard = document.querySelector(".popup_type_image");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewAvatar = document.querySelector(".popup_type_avatar");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardDesc = popupCard.querySelector(".popup__caption");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const errorScreen = container.parentElement.querySelector(".page__section-error");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".popup__input-error_active",
};

// Объект формы редактирования профиля и ее элементы
const formEditProfile = {
  form: getFormModal(popupEditProfile),
};
formEditProfile.name = formEditProfile.form.querySelector("#popup__input_type_name");
formEditProfile.description = formEditProfile.form.querySelector("#popup__input_type_description");

// Объект текущего (отображаемого) профиля
const currentProfile = {
  profile: document.querySelector(".profile"),
};
currentProfile.name = currentProfile.profile.querySelector(".profile__title");
currentProfile.description = currentProfile.profile.querySelector(".profile__description");
currentProfile.avatar = currentProfile.profile.querySelector(".profile__image");

// Объект формы новой карточки и ее элементы
const formNewCard = {
  form: getFormModal(popupNewCard),
};
formNewCard.name = formNewCard.form.querySelector(
  "#popup__input_type_card-name"
);
formNewCard.link = formNewCard.form.querySelector("#popup__input_type_url");

// Объект формы новой аватарки
const formNewAvatar = {
  form: getFormModal(popupNewAvatar),
};
formNewAvatar.link = formNewAvatar.form.querySelector("#popup__input_type_url");

const formDeleteCard = {
  form: getFormModal(popupDeleteCard),
};

// ========== Функции ==========

function getFormModal(modalElement) {
  return modalElement.querySelector(".popup__form");
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

// Обработчик формы обновления профиля
function handleFormProfileSubmit(e) {
  e.preventDefault();
  formEditProfile.form._button.textContent = "Сохранение...";
  updateUserProfile({
    name: formEditProfile.name.value,
    about: formEditProfile.description.value,
  })
    .then((data) => {
      currentProfile.name.textContent = data.name;
      currentProfile.description.textContent = data.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formEditProfile.form._button.textContent = "Сохранить";
    });

  onCloseModal(popupEditProfile);
}

// Обработчик формы добавления карточки
function handleFormCardSubmit(e) {
  e.preventDefault();
  formNewCard.form._button.textContent = "Сохранение...";

  postCard({
    name: formNewCard.name.value,
    link: formNewCard.link.value,
  })
    .then((card) => {
      container.prepend(
        getCardElement(
          currentProfile._id,
          card,
          cardTemplate,
          setImageModal,
          handlePopupDeleteCard,
          handleLike
        )
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formNewCard.form._button.textContent = "Сохранить";
    });

  formNewCard.form.reset();
  clearValidation(formNewCard.form, validationConfig);
  onCloseModal(popupNewCard);
}

function renderUserProfile(data) {
  currentProfile.name.textContent = data.name;
  currentProfile.description.textContent = data.about;
  currentProfile.avatar.style.backgroundImage = `url(${data.avatar})`;
  currentProfile._id = data._id;
  currentProfile.cohort = data.cohort;
}

function renderCards(data) {
  data.forEach((card) => {
    container.append(
      getCardElement(
        currentProfile._id,
        card,
        cardTemplate,
        setImageModal,
        handlePopupDeleteCard,
        handleLike
      )
    );
  });
}

// Обработчик на открытие модального окна удаления карточки
function handlePopupDeleteCard(cardElement) {
  openModal(popupDeleteCard);
  popupDeleteCard._cardElement = cardElement;
}

// Обработчик формы удаления карточки
function handleFormDeleteCardSubmit(e, cardElement) {
  e.preventDefault();
  deleteCard(cardElement._id)
    .then(() => cardElement.remove())
    .catch((err) => console.log(err));
  onCloseModal(popupDeleteCard);
}

// Обработчик лайка
function handleLike(e, cardElement) {
  if (!e.target.classList.contains("card__like-button_is-active")) {
    likeCard(cardElement._id)
      .then((dataLikedCard) => {
        cardElement.querySelector(".card__like-counter").textContent = dataLikedCard.likes.length;
        e.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    dislikeCard(cardElement._id)
      .then((dataLikedCard) => {
        cardElement.querySelector(".card__like-counter").textContent = dataLikedCard.likes.length;
        e.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

// Обработчик формы обновления аватара профиля
function handleFormAvatarSubmit(e) {
  e.preventDefault();
  formNewAvatar.form._button.textContent = "Сохранение...";

  postAvatar({ avatar: formNewAvatar.link.value })
    .then((data) => {
      currentProfile.avatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formNewAvatar.form._button.textContent = "Сохранить";
    });

  formNewAvatar.form.reset();
  clearValidation(formNewAvatar.form, validationConfig);
  onCloseModal(popupNewAvatar);
}

function showWarning(errorElement, errorText) {
  errorElement.classList.add("page__section-error-active");
  errorElement.textContent = errorText;
}

function hideWarning(errorElement) {
  errorElement.classList.remove("page__section-error-active");
  errorElement.textContent = "";
}

function makeButtonDisabled(button) {
  button.disabled = true;
}

// ========== Обработчики событий ==========
buttonEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);
  setProfileModal(currentProfile);
  clearValidation(formEditProfile.form, validationConfig);
});

buttonNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(formNewCard.form, validationConfig);
});

currentProfile.avatar.addEventListener("click", () => {
  openModal(popupNewAvatar);
  clearValidation(formNewAvatar.form, validationConfig);
});

document.querySelectorAll(".popup__close").forEach((buttonClose) => {
  buttonClose.addEventListener("click", (e) => {
    onCloseModal(e.target.closest(".popup"));
  });
});

formEditProfile.form.addEventListener("submit", handleFormProfileSubmit);
formNewCard.form.addEventListener("submit", handleFormCardSubmit);
formNewAvatar.form.addEventListener("submit", handleFormAvatarSubmit);
formDeleteCard.form.addEventListener("submit", (e) => {
  handleFormDeleteCardSubmit(e, popupDeleteCard._cardElement);
});
document.addEventListener("mousedown", onCloseModalOverlay);

// ========== Инициализация ==========
setModalAnimation();

enableValidation(validationConfig);

showWarning(errorScreen, "Загрузка карточек...");
Promise.all([fetchUserData(), fetchCardItems()])
  .then(([userData, cardsData]) => {
    renderUserProfile(userData);
    renderCards(cardsData);
    hideWarning(errorScreen);
  })
  .catch((err) => {
    console.log(`Ошибка промиса: ${err}`);
    renderUserProfile({
      name: `Ошибка :(`,
      about: `Не удалось загрузить данные. Обновите страницу.`,
      avatar: null,
    });
    makeButtonDisabled(buttonEditProfile);
    makeButtonDisabled(buttonNewCard);
    currentProfile.avatar.classList.add('profile__image-disabled');
    showWarning(errorScreen, "Тут пусто...");
  });