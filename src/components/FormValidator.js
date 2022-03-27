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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._objectSettings.inactiveButtonClass
      );
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(
        this._objectSettings.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._objectSettings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._objectSettings.submitButtonSelector
    );
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isInputValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
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
