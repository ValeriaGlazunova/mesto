//функция отправки валидной формы
const sumbitValidForm = (evt) => {
  evt.preventDefault();
}

//функция отображения стиля неверного инпута
const showInputError = (inputErrorClass, formError, input) => {
   formError.textContent = input.validationMessage;
   input.classList.add(inputErrorClass);
};

//функция скрытия стиля неверного инпута
 const hideInputError = (inputErrorClass, formError, input) => {
    formError.textContent = '';
    input.classList.remove(inputErrorClass)
};

//функция отображения неактивной кнопки сохранения
const disableButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
};

//функция отображения активной кнопки сохранения
const enableButton = (inactiveButtonClass, button) => {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
};

//функция проверки корректности введенных данных в инпут
const isInputValid = ({inputErrorClass}, form, input) => {
  const formError = form.querySelector(`#${input.id}-error`);
  
  if(input.validity.valid) {
    hideInputError(inputErrorClass, formError, input);
  } else {
    showInputError(inputErrorClass, formError, input);
  }
}

//функция проверки состояния кнопки по валидности формы
const isButtonValid = ({inactiveButtonClass}, form, button) => {
  if (form.checkValidity()) {
    enableButton(inactiveButtonClass, button);
  } else {
    disableButton(inactiveButtonClass, button);
  }
}

//функция проверки валидности формы
function enableValidation ({formSelector, inputSelector, submitButtonSelector, ...rest}) {
  const form = document.querySelector(formSelector);
    form.addEventListener('submit', sumbitValidForm);

  const formInputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  isButtonValid(rest, form, button);

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      isInputValid(rest, form, input);
      isButtonValid(rest, form, button);
    });
  })
  
};


enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error'
});