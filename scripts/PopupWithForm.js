import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector,  {submitFormCallback} ) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }
    _getInputValues() {
        this._formInputInfo = {};
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._inputList.forEach((input) => {
          this._formInputInfo[input.name] = input.value;
        });

            return this._formInputInfo;
        
    }
    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
    setEventListeners() {
        super.setEventListeners();

        this._popup
        .querySelector('.popup__form')
        .addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._getInputValues());
            this.close()
        } )
    }
}