const profileEditOpenPopupButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImageOpen = document.querySelector('.popup_type_img-open');
const popupEditCloseButton = document.querySelector('.popup__close-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
const popupImageOpenCloseButton = document.querySelector('.popup__close-button_type_img-open');
const profileAddButton = document.querySelector('.profile__add-button');
const popupSaveCardButton = document.querySelector('.popup__save-button_type_add-card');

let formElement = document.querySelector('.popup__form_type_edit-profile');
let formAddElement = document.querySelector('.popup__form_type_add-card');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let cardNameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('.popup__input_type_card-link');
let imagePopup = document.querySelector('.popup__image');
let subtitlePopup = document.querySelector('.popup__subtitle');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const userTemplate = document.querySelector('#template').content;
const elements = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //добавление массива карточек на страницу
  initialCards.forEach(item => {
    let card = renderCard(item.name, item.link);

    elements.appendChild(card);
    //addCard(card);
   
  });

  //создание карточки
function renderCard(name, link) {
  const newCard = userTemplate.cloneNode(true);

  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__image').alt = name;
  newCard.querySelector('.element__title').innerText = name;

  newCard.querySelector('.element__image').addEventListener('click',() => {
  imagePopup.src = link;
  subtitlePopup.textContent = name;
  popupImageOpen.classList.add('popup_opened');
});

  addListeners(newCard);
 
  return newCard;
};

  function addListeners(el) {
    el.querySelector('.element__trash-btn').addEventListener('click', deleteCard);
    el.querySelector('.element__like-btn').addEventListener('click', likeCard);
  };

  popupImageOpenCloseButton.addEventListener('click', function() {
    closePopup(popupImageOpen);
  });

  function deleteCard (event) {
    event.target.closest('.element').remove();
  }

function likeCard (event) {
  event.target.closest('.element__like-btn').classList.toggle('element__like-btn_active');
}

function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandlerProfileEdit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup (popupEditProfile);
};

function formSubmitHandlerAddCard (evt) {
  evt.preventDefault();
  let card = renderCard(cardNameInput.value, cardLinkInput.value);
  addCard(card);
  closePopup(popupAddCard);
};

function addCard(card) {
elements.prepend(card);
};


profileEditOpenPopupButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
});
popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});
profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});
popupAddCardCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});
//ниже добавлен код для закрытия popup при нажатии мимо поля popup
//popup.addEventListener('click', function(event) {
   // if(event.target === event.currentTarget) {
      //  closePopup();
   // }
//});


formElement.addEventListener('submit', formSubmitHandlerProfileEdit); 
formAddElement.addEventListener('submit', formSubmitHandlerAddCard);
