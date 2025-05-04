function showInputError(form, input, errorMessage, validationConfig) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass.slice(1));
  error.classList.add(validationConfig.errorClass.slice(1));
  error.textContent = errorMessage;
}

function hideInputError(form, input, validationConfig) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass.slice(1));
  error.classList.remove(validationConfig.errorClass.slice(1));
  error.textContent = "";
}

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else inputElement.setCustomValidity("");

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else hideInputError(formElement, inputElement, validationConfig);
}

const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const button = formElement.querySelector(validationConfig.submitButtonSelector);

  formElement._inputList = inputList;
  formElement._button = button;

  toggleButtonState(inputList, button, validationConfig);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, validationConfig);
      toggleButtonState(inputList, button, validationConfig);
    });
  });
}

function clearValidation(formElement, validationConfig) {
  if (!formElement._inputList || !formElement._button) return;

  formElement._inputList.forEach((input) => {  
    hideInputError(formElement, input, validationConfig);
    formElement._button.disabled = !input.validity.valid;
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
}

export { enableValidation, clearValidation };