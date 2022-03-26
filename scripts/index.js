import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";

const profileEditOpenPopupButton = document.querySelector(".profile__edit-button");
//const popupEditProfile = document.querySelector(".popup_type_edit-profile");
//const popupAddCard = document.querySelector(".popup_type_add-card");
const profileAddButton = document.querySelector(".profile__add-button");

const formEditElement = document.querySelector(".popup__form_type_edit-profile");
const formAddElement = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


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

const createCard = item => {
  const card = new Card(item, '#template', handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

const cardList = new Section ({

  renderer: (item) => {
    cardList.addItem(createCard(item), false);
  }
}, '.elements');

cardList.renderItems({items: initialCards});

//добавление массива карточек на страницу
//initialCards.forEach((data) => {
// addCard(data, false)
//});

const popupEditProfile = new Popup(".popup_type_edit-profile");

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupEditProfile.close();
  formEditElement.reset();
}

const popupAddCard = new Popup('.popup_type_add-card');

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardItem = {name: cardNameInput.value, link: cardLinkInput.value};
  cardList.addItem(createCard(newCardItem), true)
  //addCard({name: cardNameInput.value, link: cardLinkInput.value}, true);
  popupAddCard.close();
  formAddElement.reset();
}

const popupImageOpen = new PopupWithImage('.popup_type_img-open');

function handleCardClick(name, link) {
      //imagePopup.src = link;
      //imagePopup.alt = name;
     // subtitlePopup.textContent = name;
      popupImageOpen.open(name, link);
}

//function addCard(data, isPrepend) {
//  const cardElement = createCard(data);
//  if (isPrepend) {
 //   elements.prepend(cardElement);
//  } else {
 //   elements.append(cardElement)
 // }
//}

//const popups = document.querySelectorAll('.popup')

//popups.forEach((popup) => {
  //  popup.addEventListener('mousedown', (evt) => {
  //      if (evt.target.classList.contains('popup_opened')) {
   //         closePopup(popup)
   //     }
   //   if (evt.target.classList.contains('popup__close-button')) {
   //       closePopup(popup)
   //     }
  //  })
//})


profileEditOpenPopupButton.addEventListener("click", () => {
  popupEditProfile.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editProfileValidate.resetValidation();
});


profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
  addCardValidate.resetValidation();
});


formEditElement.addEventListener("submit", handleProfileEditFormSubmit);
formAddElement.addEventListener("submit", handleAddCardFormSubmit);


