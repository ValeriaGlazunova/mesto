//функция отправки валидной формы
const sumbitValidForm = (evt) => {
  evt.preventDefault();
}

//функция отображения стиля неверного инпута
const showInputError = (formError, input) => {
   formError.textContent = input.validationMessage;
   input.classList.add('popup__input_type_error');
};

//функция скрытия стиля неверного инпута
 const hideInputError = (formError, input) => {
    formError.textContent = '';
    input.classList.remove('popup__input_type_error')
};

//функция отображения неактивной кнопки сохранения
const disableButton = (button) => {
  button.setAttribute('disabled', '');
  button.classList.add('popup__save-button_disabled');
};

//функция отображения активной кнопки сохранения
const enableButton = (button) => {
  button.removeAttribute('disabled');
  button.classList.remove('popup__save-button_disabled');
};

//функция проверки корректности введенных данных в инпут
const isInputValid = (form, input) => {
  const formError = form.querySelector(`#${input.id}-error`);
  
  if(input.validity.valid) {
    hideInputError(formError, input);
  } else {
    showInputError(formError, input);
  }
}

//функция проверки состояния кнопки по валидности формы
const isButtonValid = (form, button) => {
  if (form.checkValidity()) {
    enableButton(button);
  } else {
    disableButton(button);
  }
}

//функция проверки валидности формы
function enableValidation () {
  const form = document.querySelector(".popup__form_type_edit-profile");
    form.addEventListener('submit', sumbitValidForm);

  const formInputs = form.querySelectorAll('.popup__input');
  const button = form.querySelector('.popup__save-button');


  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      isInputValid(form, input);
      isButtonValid(form, button);
    });
  })
  
};



enableValidation ();