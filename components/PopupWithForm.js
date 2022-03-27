import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback ) {
        super(popupSelector)
        this._submitFormCallback = submitFormCallback
        this._form = this._popup.querySelector('.popup__form')
    }
    _getInputValues() {
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        const inputValues = {};
        inputs.forEach((input) => {
          inputValues[input.name] = input.value;
        });

            return inputValues;
        
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', () => {
            this._submitFormCallback(this._getInputValues())
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}