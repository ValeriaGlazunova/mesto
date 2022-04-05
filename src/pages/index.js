import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  profileEditOpenPopupButton,
  profileAddButton,
  formEditElement,
  formAddElement,
  nameInput,
  jobInput,
  validationConfig,
} from "../utils/constants.js";
import { api } from '../components/Api.js'

import "../pages/index.css";

//создание экземпляров классов валидации
const validationProfileEdit = new FormValidator(
  validationConfig,
  formEditElement
);
const validationAddCard = new FormValidator(validationConfig, formAddElement);

//запуск работы валидации
validationProfileEdit.enableValidation();
validationAddCard.enableValidation();

//создание экземпляра класса создания карточки
const createCard = (data) => {
  const card = new Card(data, "#template", handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
};

//создание экземпляра класса добавления элементов на страницу
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item), false);
    },
  },
  ".elements"
);

//добавление первоначального списка карточек на страницу при загрузке
cardList.renderItems({ items: initialCards });

//создание экземпляра класса попапа с картинкой
const popupImageOpen = new PopupWithImage(".popup_type_img-open");

//фукция-колбэк для открытия/закрытия попапа с картинкой
function handleCardClick(name, link) {
  popupImageOpen.open(name, link);
}
popupImageOpen.setEventListeners();

//функция-колбэк внесения данных в профиль
const handleProfileEditFormSubmit = (data) => {
  const { name, job } = data;
  userInfo.setUserInfo(name, job);
  popupEditProfile.close();
};

//создание экземпляра класса попапа изменения профиля
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileEditFormSubmit
);
popupEditProfile.setEventListeners();

//функция-колбэк создания карточки с данными пользователя
const handleAddCardFormSubmit = (data) => {
  const newCardItem = createCard({
    name: data["card-name-input"],
    link: data["card-url-input"],
  });
  cardList.addItem(newCardItem, true);
  popupAddCard.close();
};

//создание экземпляра класса попапа создания карточки
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

//создание экземпляра класса получения данных пользователя для внесения данных в профиль
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

//подписка на слушатель кнопки открытия попапа изменения профиля
profileEditOpenPopupButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  validationProfileEdit.resetValidation();
  popupEditProfile.open();
});

//подписка на слушатель кнопки открытия попапа добавления карточки
profileAddButton.addEventListener("click", () => {
  validationAddCard.resetValidation();
  popupAddCard.open();
});
