const profileEditOpenPopupButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupImageOpen = document.querySelector(".popup_type_img-open");
const popupEditCloseButton = document.querySelector(".popup__close-button_type_edit-profile");
const popupAddCardCloseButton = document.querySelector(".popup__close-button_type_add-card");
const popupImageOpenCloseButton = document.querySelector(".popup__close-button_type_img-open");
const profileAddButton = document.querySelector(".profile__add-button");

const formEditElement = document.querySelector(".popup__form_type_edit-profile");
const formAddElement = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");
const imagePopup = document.querySelector(".popup__image");
const subtitlePopup = document.querySelector(".popup__subtitle");
const editProfileSaveButton = formEditElement.querySelector('.popup__save-button');
const addCardSaveButton = formAddElement.querySelector('.popup__save-button');
const editProfileInputList = Array.from(formEditElement.querySelectorAll('.popup__input'));

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const userTemplate = document.querySelector("#template").content;
const elements = document.querySelector(".elements");

//добавление массива карточек на страницу
initialCards.forEach((item) => {
  elements.appendChild(renderCard(item.name, item.link));
});

//создание карточки
function renderCard(name, link) {
  const newCard = userTemplate.cloneNode(true);
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

  addListeners(newCard);

  return newCard;
}

function deleteCard(event) {
  event.target.closest(".element").remove();
}

function likeCard(event) {
  event.target
    .closest(".element__like-btn")
    .classList.toggle("element__like-btn_active");
}

const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEscape); 
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
}

function closePopupEscape (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(openedPopup);
}
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditElement.reset();
  //editProfileSaveButton.classList.add('popup__save-button_disabled');
  //editProfileSaveButton.setAttribute("disabled", "");
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(renderCard(cardNameInput.value, cardLinkInput.value));
  closePopup(popupAddCard);
  formAddElement.reset();
 // addCardSaveButton.classList.add('popup__save-button_disabled');
 // addCardSaveButton.setAttribute("disabled", "");
}

function addCard(card) {
  elements.prepend(card);
}

function addListeners(el) {
  el.querySelector(".element__trash-btn").addEventListener("click", deleteCard);
  el.querySelector(".element__like-btn").addEventListener("click", likeCard);
}

popupImageOpenCloseButton.addEventListener("click", function () {
  closePopup(popupImageOpen);
});

profileEditOpenPopupButton.addEventListener("click", (validationConfig) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  resetValidation(editProfileInputList, editProfileSaveButton, formEditElement, validationConfig);
});

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});
profileAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);

});
popupAddCardCloseButton.addEventListener("click", function () {
  closePopup(popupAddCard);
});

formEditElement.addEventListener("submit", handleProfileEditFormSubmit);
formAddElement.addEventListener("submit", handleAddCardFormSubmit);

popupEditProfile.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupEditProfile);
  }
});

popupAddCard.addEventListener("mousedown", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupAddCard);
  }
});

popupImageOpen.addEventListener("mousedown", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupImageOpen);
  }
});


