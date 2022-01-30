const profileEditOpenPopupButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupEditCloseButton = document.querySelector('.popup__close-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_type_add-card');
const profileAddButton = document.querySelector('.profile__add-button');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let cardNameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('popup__input_type_card-link');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

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

const userTemplate = document.querySelector('#template').content;
const elements = document.querySelector('.elements');


function renderCard(name, link) {
  const userElement = userTemplate.cloneNode(true);

  userElement.querySelector('.element__image').src = link;
  userElement.querySelector('.element__image').alt = name;
  userElement.querySelector('.element__title').textContent = name;

  addListeners(userElement);
  elements.appendChild(userElement);

  return renderCard;
  }

  initialCards.forEach(item => {
    let newCard = renderCard(item.name, item.link, userTemplate);
  });

  function addListeners(el) {
    el.querySelector('.element__trash-btn').addEventListener('click', deleteCard);
  }

  function deleteCard (event) {
    event.target.closest('.element').remove();
    resetForm();
  }

function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup ();
}

profileEditOpenPopupButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
});
profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});
popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
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

formElement.addEventListener('submit', formSubmitHandler); 

