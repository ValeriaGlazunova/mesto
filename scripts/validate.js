const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

//функция отображения стиля неверного инпута
const showInputError = (
  { inputErrorClass, errorClass },
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//функция скрытия стиля неверного инпута
const hideInputError = (
  { inputErrorClass, errorClass },
  formElement,
  inputElement
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//функция проверки корректности введенных данных в инпут
const isInputValid = ({ ...rest }, formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(rest, formElement, inputElement);
  } else {
    showInputError(
      rest,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  { inactiveButtonClass },
  inputList,
  buttonElement
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (
  { inputSelector, submitButtonSelector, ...rest },
  formElement
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(rest, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isInputValid(rest, formElement, inputElement);
      toggleButtonState(rest, inputList, buttonElement);
    });
  });
};

function resetValidation(inputList, buttonElement, formElement, {...rest}) { 
  toggleButtonState(rest, inputList, buttonElement); 
  
  inputList.forEach((inputElement) => { 
    hideInputError(rest, formElement, inputElement); 
  }); 
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(rest, formElement);
  });
};

enableValidation(validationConfig);
