export class FormValidator {
  constructor(objectSettings, form) {
    this._form = form;
    this._objectSettings = objectSettings;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._objectSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objectSettings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._objectSettings.inputErrorClass);
    errorElement.classList.remove(this._objectSettings.errorClass);
    errorElement.textContent = "";
  }

  _isInputValid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._objectSettings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._objectSettings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._objectSettings.inputSelector)
    );
    const buttonElement = this._form.querySelector(
      this._objectSettings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isInputValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  resetValidation(inputList, buttonElement) {
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
