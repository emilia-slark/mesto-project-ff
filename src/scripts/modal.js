function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  modalElement.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__content'))
      closeModal(modalElement);
  });
  document.addEventListener('keydown', (e) => closeOnEscape(e, modalElement));
}

function setModalAnimation() {
  document.querySelectorAll('.popup').forEach((item) => {
    item.classList.add('popup_is-animated');
  });
}

function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(e, modalElement) {
  if (e.key === 'Escape') 
    closeModal(modalElement);
}

function setImageModal(modalElement, card) {
  modalElement.querySelector('.popup__image').src = card.querySelector('.card__image').src;
  modalElement.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
}

function setProfileModal(formElement, currentProfile) {
  formElement.name.value = currentProfile.name.textContent;
  formElement.description.value = currentProfile.description.textContent;
}

const getFormModal = (modalElement) => modalElement.querySelector('.popup__form');

export {
  openModal,
  closeModal,
  setImageModal,
  setProfileModal,
  setModalAnimation,
  getFormModal
};