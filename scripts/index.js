const profileEditOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__save-button');


function openPopup () {
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

profileEditOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closePopup();
    }
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name-field');
let jobInput = document.querySelector('.popup__description-field');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let userName = nameInput.value; 
    let userDescription = jobInput.value; 
    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');
    profileName.textContent = userName;
    profileDescription.textContent = userDescription;
    closePopup ();
}

    formElement.addEventListener('submit', formSubmitHandler); 
