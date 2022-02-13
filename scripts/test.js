//функция отправки валидной формы
//const sumbitValidForm = (evt) => {
//  evt.preventDefault();
//}

//const button = formElement.querySelector('.popup__save-button');

//функция отображения стиля неверного инпута
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.add('popup__input_type_error'); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

//функция скрытия стиля неверного инпута
 const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

//функция отображения неактивной кнопки сохранения
//const disableButton = (button) => {
//  button.setAttribute('disabled', '');
//  button.classList.add('popup__save-button_disabled');
//};

//функция отображения активной кнопки сохранения
//const enableButton = (button) => {
 // button.removeAttribute('disabled');
 // button.classList.remove('popup__save-button_disabled');
//};

//функция проверки корректности введенных данных в инпут
const isInputValid = (formElement, inputElement) => {
  
  
  if(inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

//функция проверки состояния кнопки по валидности формы
//const isButtonValid = (form, button) => {
//  if (form.checkValidity()) {
 //   enableButton(button);
 // } else {
//    disableButton(button);
//  }
//}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement)
    });
  });
};

//функция проверки валидности формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
  
  setEventListeners(formElement);

  });
  
};

enableValidation();

//enableValidation ({
//  formSelector: '.popup__form',
//  inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__save-button',
//  inactiveButtonClass: 'popup__save-button_disabled',
//  inputErrorClass: 'popup__input_type_error'
//});