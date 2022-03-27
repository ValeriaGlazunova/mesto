export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._userTemplate = document
      .querySelector(cardTemplate)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
  }

  _deleteCard = (event) => {
    event.target.closest(".element").remove();
  };

  _likeCard = (event) => {
    event.target
      .closest(".element__like-btn")
      .classList.toggle("element__like-btn_active");
  };

  _addListeners() {
    this._cardElement
      .querySelector(".element__trash-btn")
      .addEventListener("click", this._deleteCard);
    this._cardElement
      .querySelector(".element__like-btn")
      .addEventListener("click", this._likeCard);
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  renderCard() {
    this._cardElement = this._userTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    this._addListeners();

    return this._cardElement;
  }
}
