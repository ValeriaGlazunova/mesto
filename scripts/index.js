import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const profileEditOpenPopupButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const formEditElement = document.querySelector(".popup__form_type_edit-profile");
const formAddElement = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");


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

const createCard = data => {
  const card = new Card(data, '#template', handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

const cardList = new Section ({

  renderer: (item) => {
    cardList.addItem(createCard(item), false);
  }
}, '.elements');

cardList.renderItems({items: initialCards});

const popupImageOpen = new PopupWithImage('.popup_type_img-open');

function handleCardClick (name, link) {
      popupImageOpen.open(name, link);
}

const handleProfileEditFormSubmit = (data) => {
  const { name, job } = data;
 userInfo.setUserInfo(name, job)
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleProfileEditFormSubmit);

popupEditProfile.setEventListeners();

const handleAddCardFormSubmit  = (data) => {
  const newCardItem = createCard({
    name: data['card-name-input'],
    link: data['card-url-input']
  })
  cardList.addItem(newCardItem, true);
  popupAddCard.close()
};

const popupAddCard = new PopupWithForm(".popup_type_add-card", handleAddCardFormSubmit)

popupAddCard.setEventListeners();

const userInfo = new UserInfo ({nameSelector:'.profile__name', jobSelector:'.profile__description'})

profileEditOpenPopupButton.addEventListener("click", () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo()
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfileValidate.resetValidation()
});


profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
  addCardValidate.resetValidation();
});




