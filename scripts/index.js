import { FormValidator } from './FormValidator.js';
import { popupImageOpen, openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';

const profileEditOpenPopupButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
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
const editProfileSaveButton = formEditElement.querySelector('.popup__save-button');
const addCardSaveButton = formAddElement.querySelector('.popup__save-button');
const editProfileInputList = Array.from(formEditElement.querySelectorAll('.popup__input'));
const addCardInputList = Array.from(formAddElement.querySelectorAll('.popup__input'));

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const elements = document.querySelector(".elements");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const editProfileValidate = new FormValidator(validationConfig, formEditElement);
const addCardValidate = new FormValidator(validationConfig, formAddElement);

editProfileValidate.enableValidation();
addCardValidate.enableValidation();

//добавление массива карточек на страницу
initialCards.forEach((data) => {
  const card = new Card(data, '#template');
  const cardElement = card.renderCard();
  elements.append(cardElement);
})

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditElement.reset();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupAddCard);
  formAddElement.reset();
}

function addCard(data) {
  const card = new Card(data, '#template');
  const cardElement = card.renderCard();
  elements.prepend(cardElement);
}

popupImageOpenCloseButton.addEventListener("click", function () {
  closePopup(popupImageOpen);
});

profileEditOpenPopupButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editProfileValidate.resetValidation(editProfileInputList, editProfileSaveButton);
});

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});
profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  addCardValidate.resetValidation(addCardInputList, addCardSaveButton);
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


