import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
    this._popup.querySelector(".popup__subtitle").textContent = name;
    super.open();
  }
}
