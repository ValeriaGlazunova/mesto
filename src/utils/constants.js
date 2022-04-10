export const profileEditOpenPopupButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");
export const avatarEditButton = document.querySelector('.profile__avatar-edit-btn');

export const formEditElement = document.querySelector(".popup__form_type_edit-profile");
export const formAddElement = document.querySelector(".popup__form_type_add-card");
export const formPopupEditElement = document.querySelector('.popup__form_type_change-avatar');
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_description");


export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};