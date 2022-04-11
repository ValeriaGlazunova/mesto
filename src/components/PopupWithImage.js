import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    this._popupImageSelector = this._popup.querySelector(".popup__image");
    this._popupImageSelector.src = link;
    this._popupImageSelector.alt = name;
    this._popup.querySelector(".popup__subtitle").textContent = name;
    super.open();
  }
}
