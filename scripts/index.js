import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";

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

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inactiveButtonClass: 'popup__btn-save_disabled',
    submitButtonSelector: '.popup__btn-save'
};

const content = document.querySelector('.content');

const profile = content.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const popupOpenButton = profile.querySelector('.profile__btn-edit');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfile.querySelector('.popup__input_title');
const inputJob = popupEditProfile.querySelector('.popup__input_job');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__btn-close');

const popupAddCard = document.querySelector('.popup_new-card');
const popupAddProfileForm = popupAddCard.querySelector('.popup__form');
const popupPlace = popupAddCard.querySelector('.popup__input_place');
const popupLink = popupAddCard.querySelector('.popup__input_link');
const popupAddCloseButton = popupAddCard.querySelector('.popup__btn-close');
const buttonAddCard = document.querySelector('.profile__btn-add');

export const popupView = document.querySelector('.popup_view-card');
export const popupImage = popupView.querySelector('.popup__image');
export const popupTitle = popupView.querySelector('.popup__caption');


const popupViewCloseButton = popupView.querySelector('.popup__btn-close');

const popups = document.querySelectorAll('.popup');

const listContainer = new Section(
    {
        items: initialCards, //массив
        renderer: (card) => {  //Содержит публичный метод, который отвечает за отрисовку всех элементов.
            listContainer.addItem(addCard(card.link, card.name));
        },
    },
    ".places__list"
);

const formAddValidator = new FormValidator(config, popupAddProfileForm);
const formEditValidator = new FormValidator(config, popupEditProfileForm);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

function addCard(link, name) {
    const card = new Card(link, name, '#template-place-item');
    return card.generateCard();
}


function loadInputProfile() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    formEditValidator.resetValidation();
    openModalWindow(popupEditProfile);
}

function saveInputProfile(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow(popupEditProfile);
}

popupEditProfileForm.addEventListener('submit', saveInputProfile);

export function openModalWindow(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pressEscKey);
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressEscKey);
}

popupOpenButton.addEventListener('click', loadInputProfile);

buttonAddCard.addEventListener('click', () => {
    popupAddProfileForm.reset();
    formAddValidator.resetValidation();

    openModalWindow(popupAddCard);
});

popupEditCloseButton.addEventListener('click', () => {
    closeModalWindow(popupEditProfile);
});

popupAddCloseButton.addEventListener('click', () => {
    closeModalWindow(popupAddCard);
});

popupViewCloseButton.addEventListener('click', () => {
    closeModalWindow(popupView);
});

popupAddProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    listContainer.addItem(
        addCard(popupLink.value, popupPlace.value)
    );

    closeModalWindow(popupAddCard);
});

function pressEscKey(e) {
    const key = e.key;
    if (key === "Escape") {
        const popup = document.querySelector('.popup_opened');
        closeModalWindow(popup);
    }
}

function overlayHandler(event, popup) {
    if (event.target === event.currentTarget) {
        closeModalWindow(popup)
    }
}

popups.forEach(elementPopup => {
    elementPopup.addEventListener('click', (event) => {
        overlayHandler(event, elementPopup);
    });
});


listContainer.renderItems();


