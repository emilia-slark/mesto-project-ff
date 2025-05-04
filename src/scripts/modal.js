function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  modalElement._handlerEscape = (e) => closeOnEscape(e, modalElement);

  if (modalElement.classList.contains("popup_type_delete-card"))
    modalElement.querySelector(".popup__button").focus();

  modalElement.addEventListener('mousedown', onCloseModalOverlay);
  document.addEventListener("keydown", modalElement._handlerEscape);
}

function onCloseModalOverlay(e) {
  if (!e.target.closest(".popup__content")) 
    onCloseModal(e.target);
}

function setModalAnimation() {
  document.querySelectorAll(".popup").forEach((item) => {
    item.classList.add("popup_is-animated");
  });
}

function onCloseModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", modalElement._handlerEscape);
  delete modalElement._handlerEscape;
}

const closeOnEscape = (e, modalElement) => {
  if (e.key === "Escape") onCloseModal(modalElement);
};

export { openModal, onCloseModal, setModalAnimation };