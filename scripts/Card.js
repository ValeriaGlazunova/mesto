class Card {
    constructor(name, link, cardTemplate) {
        this._name = name;
        this._link = link;
        this._userTemplate = document.querySelector(cardTemplate)
        .content.querySelector(".element");

    }

    _addListeners(el) {
        el.querySelector(".element__trash-btn").addEventListener("click", deleteCard);
        el.querySelector(".element__like-btn").addEventListener("click", likeCard);
      }

     renderCard() {
        const newCard = this._userTemplate.cloneNode(true);
        const newCardImageElement = newCard.querySelector(".element__image");
      
        newCardImageElement.src = link;
        newCardImageElement.alt = name;
        newCard.querySelector(".element__title").textContent = name;
      
        newCardImageElement.addEventListener("click", () => {
          imagePopup.src = link;
          imagePopup.alt = name;
          subtitlePopup.textContent = name;
          openPopup(popupImageOpen);
        });
      
        this._addListeners(newCard);
      
        return newCard;
    }
    
}
