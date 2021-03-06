import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._popupSubmitButton = this._form.querySelector(".popup__save-button");
    this._popupOriginText = this._popupSubmitButton.textContent;
    this._inputList = [...this._form.querySelectorAll(".popup__input")];
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitFormCallback = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitFormCallback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }

  changeLoadingText(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = "Сохранение...";
    } else {
      this._popupSubmitButton.textContent = this._popupOriginText;
    }
  }
}
