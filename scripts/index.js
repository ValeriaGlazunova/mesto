const profileEditOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileAddButton = document.querySelector('.profile__add-button');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

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

const userElement = userTemplate.querySelector('.element').cloneNode(true);

userElement.querySelector('.element__image').src = link;
userElement.querySelector('.element__title').textContent = name;

elements.append(userElement);


function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup ();
}

profileEditOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
// ниже добавлен код для закрытия popup при нажатии мимо поля popup
//popup.addEventListener('click', function(event) {
    //if(event.target === event.currentTarget) {
        //closePopup();
   // }
//});

formElement.addEventListener('submit', formSubmitHandler); 
