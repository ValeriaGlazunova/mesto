import { imagePopup, subtitlePopup, openPopup, popupImageOpen } from './utils.js';

export class Card {
    constructor(data, cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._userTemplate = document.querySelector(cardTemplate)
        .content.querySelector(".element");

    }

    _deleteCard = (event) => {
      event.target.closest(".element").remove();
    }
    
    _likeCard = (event) => {
      event.target
        .closest(".element__like-btn")
        .classList.toggle("element__like-btn_active");
    }

    _addListeners(el) {
        el.querySelector(".element__trash-btn").addEventListener("click", this._deleteCard);
        el.querySelector(".element__like-btn").addEventListener("click", this._likeCard);
      }

     renderCard() {
        const newCard = this._userTemplate.cloneNode(true);
        const newCardImageElement = newCard.querySelector(".element__image");
      
        newCardImageElement.src = this._link;
        newCardImageElement.alt = this._name;
        newCard.querySelector(".element__title").textContent = this._name;
      
        newCardImageElement.addEventListener("click", () => {
          imagePopup.src = this._link;
          imagePopup.alt = this._name;
          subtitlePopup.textContent = this._name;
          openPopup(popupImageOpen);
        });
      
        this._addListeners(newCard);
      
        return newCard;
    }
    
}
