export const imagePopup = document.querySelector(".popup__image");
export const subtitlePopup = document.querySelector(".popup__subtitle");
export const popupImageOpen = document.querySelector(".popup_type_img-open");

export const openPopup = (popupElement) => {
    popupElement.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEscape); 
  }

  function closePopupEscape (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
      closePopup(openedPopup);
  }
  }

  export function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEscape);
  }