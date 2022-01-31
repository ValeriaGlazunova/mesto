const profileEditOpenPopupButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupEditCloseButton = document.querySelector('.popup__close-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupSaveCardButton = document.querySelector('.popup__save-button_type_add-card');

let formElement = document.querySelector('.popup__form_type_edit-profile');
let formAddElement = document.querySelector('.popup__form_type_add-card');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let cardNameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('.popup__input_type_card-link');

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
    let card = renderCard(item.name, item.link, userTemplate);
 
    //elements.appendChild(card);
  });

  //создание карточки
function renderCard(name, link) {
  const card = userTemplate.cloneNode(true);

  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = name;
  card.querySelector('.element__title').innerText = name;

  addListeners(card);
  elements.appendChild(card);
  return renderCard;
} 


 //создание новой карточки из данных от пользователя
  function renderNewCard() {
  const newCard = userTemplate.cloneNode(true);

  newCard.querySelector('.element__image').src = cardLinkInput.value;
  newCard.querySelector('.element__image').alt = cardNameInput.value;
  newCard.querySelector('.element__title').innerText = cardNameInput.value;

    addListeners(newCard);
    elements.prepend(newCard);
  }

  function addListeners(el) {
    el.querySelector('.element__trash-btn').addEventListener('click', deleteCard);
    el.querySelector('.element__like-btn').addEventListener('click', likeCard);
  }

  function deleteCard (event) {
    event.target.closest('.element').remove();
  }

function likeCard (event) {
  event.target.closest('.element__like-btn').classList.add('element__like-btn_active');
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
  let cardName = cardNameInput.value;
  let cardNameSave = document.querySelector('.element__title');
  let cardText = cardLinkInput.value;
  let cardTextSave = document.querySelector('.element__image');
  cardNameSave.textContent = cardName;
  cardTextSave.src = cardText;
  cardTextSave.alt = cardText;
  closePopup(popupAddCard);
};

function addCard(event) {
  renderNewCard(cardNameInput.value, cardLinkInput.value);
//let newCard = renderCard(cardNameInput.value, cardLinkInput.value);
//elements.prepend(newCard);
}


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
popupSaveCardButton.addEventListener('click', addCard);
