export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userTemplate = document
      .querySelector(cardTemplate)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _likeCard = () => {
    this._likeButton
      .classList.toggle("element__like-btn_active");
  };

  _addListeners() {
    this._cardElement
      .querySelector(".element__trash-btn")
      .addEventListener("click", this._deleteCard);
      this._likeButton
      .addEventListener("click", this._likeCard);
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _addLikes() {
    const likesCounter = this._cardElement.querySelector('.element__like-nmb')
    likesCounter.textContent = this._likes.length
  
  }

  renderCard() {
    this._cardElement = this._userTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");
    

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    this._likeButton = this._cardElement.querySelector('.element__like-btn');
    this._addLikes();

    this._addListeners();

    return this._cardElement;
  }
}
