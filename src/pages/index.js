import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  profileEditOpenPopupButton,
  profileAddButton,
  avatarEditButton,
  formEditElement,
  formAddElement,
  formPopupEditElement,
  nameInput,
  jobInput,
  validationConfig,
} from "../utils/constants.js";
import { api } from "../components/Api.js";

import "../pages/index.css";

let userId;

//получение изначальных данных профила
api.getProfile().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserAvatar(res.avatar);
  userId = res._id;
});

//отображение изначальных карточек на странице
api.getInitialCards().then((list) => {
  list.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    cardList.addItem(card);
  });
});

//создание экземпляров классов валидации
const validationProfileEdit = new FormValidator(
  validationConfig,
  formEditElement
);
const validationAddCard = new FormValidator(validationConfig, formAddElement);

const validationAvatarChange = new FormValidator(
  validationConfig,
  formPopupEditElement
);

//запуск работы валидации
validationProfileEdit.enableValidation();
validationAddCard.enableValidation();
validationAvatarChange.enableValidation();

//создание экземпляра класса создания карточки
const createCard = (data) => {
  const card = new Card(
    data,
    "#template",
    handleCardClick,
    (_id) => {
      popupConfirm.open();
      popupConfirm.changeSubmitHandler(() => {
        api.deleteMyCard(_id).then(() => {
          card.deleteCard();
          popupConfirm.close();
        });
      });
    },
    (_id) => {
      if (card.isLiked()) {
        api.deleteLike(_id).then((res) => {
          card.addLikes(res.likes);
        });
      } else {
        api.putLike(_id).then((res) => {
          card.addLikes(res.likes);
        });
      }
    }
  );
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
cardList.renderItems({ items: [] });

//создание экземпляра класса попапа с картинкой
const popupImageOpen = new PopupWithImage(".popup_type_img-open");

//фукция-колбэк для открытия/закрытия попапа с картинкой
function handleCardClick(name, link) {
  popupImageOpen.open(name, link);
}
popupImageOpen.setEventListeners();

//функция-колбэк внесения данных в профиль
const handleProfileEditFormSubmit = (data) => {
  popupEditProfile.changeLoadingText(true);
  const { name, job } = data;
  api
    .editProfile(name, job)
    .then(() => {
      userInfo.setUserInfo(name, job);
    })
    .finally(() => {
      popupEditProfile.changeLoadingText(false);
    });
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
  popupAddCard.changeLoadingText(true);
  api
    .postCard(data["card-name-input"], data["card-url-input"])
    .then((res) => {
      const newCardItem = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
      cardList.addItem(newCardItem, true);
      popupAddCard.close();
    })
    .finally(() => {
      popupAddCard.changeLoadingText(false);
    });
};

//создание экземпляра класса попапа создания карточки
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
popupAddCard.setEventListeners();

//создание экземпляра класса попапа подтверждения удаления карточки
const popupConfirm = new PopupWithForm(".popup_type_confirm");
popupConfirm.setEventListeners();

const handleAvatarEditFormSubmit = (data) => {
  popupAvatarChange.changeLoadingText(true);
  api
    .changeAvatar(data["avatar-url-input"])
    .then(() => {
      userInfo.setUserAvatar(data["avatar-url-input"]);
      popupAvatarChange.close();
    })
    .finally(() => {
      popupAvatarChange.changeLoadingText(false);
    });
};

//создание экземпляра класса попапа изменения аватара
const popupAvatarChange = new PopupWithForm(
  ".popup_type_change-avatar",
  handleAvatarEditFormSubmit
);
popupAvatarChange.setEventListeners();

//создание экземпляра класса получения данных пользователя для внесения данных в профиль
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
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

//подписка на слушатель кнопки открытия попапа редактирования аватара
avatarEditButton.addEventListener("click", () => {
  validationAvatarChange.resetValidation();
  popupAvatarChange.open();
});
