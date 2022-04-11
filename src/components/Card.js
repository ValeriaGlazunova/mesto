export class Card {
  constructor(
    data,
    cardTemplate,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._userTemplate = document
      .querySelector(cardTemplate)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    

  }

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _addListeners() {
    this._cardElement
      .querySelector(".element__trash-btn")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  isLiked() {
    const userWhoLiked = this._likes.find((user) => user._id === this._userId);
    return userWhoLiked;
  }

  addLikes(newLikes) {
    this._likes = newLikes; 
    
    this._likesCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeCard();
    } else {
      this._unlikeCard();
    }
  }

  _likeCard = () => {
    this._likeButton.classList.add("element__like-btn_active");
  };

  _unlikeCard = () => {
    this._likeButton.classList.remove("element__like-btn_active");
  };

  renderCard() {
    this._cardElement = this._userTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._likesCounter = this._cardElement.querySelector(".element__like-nmb"); 

    this._likeButton = this._cardElement.querySelector(".element__like-btn");
    this.addLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".element__trash-btn").style.display =
        "none";
    }

    this._addListeners();

    return this._cardElement;
  }

  
}


