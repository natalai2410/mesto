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

const popupView = document.querySelector('.popup_view-card');
const popupImage = popupView.querySelector('.popup__image');
const popupTitle = popupView.querySelector('.popup__caption');
const popupViewCloseButton = popupView.querySelector('.popup__btn-close');

const popups = document.querySelectorAll('.popup');

const listContainer = document.querySelector('.places__list');
const template = document.querySelector('.template');

function loadCards() {
    const html = initialCards.map((card) => {
        return createCard(card.name, card.link);
    });
    listContainer.append(...html);
}

function clickLikeButton(e) {
    e.target.classList.toggle('place-item__like_active');
}

function clickDeleteCardButton(e) {
    const el = e.target.closest('.place-item');
    el.remove();
}

window.onload = function () {
    loadCards();
};

function loadInputProfile() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    resetValidation(popupEditProfileForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inactiveButtonClass: 'popup__btn-save_disabled',
        submitButtonSelector: '.popup__btn-save'
    });
    openModalWindow(popupEditProfile);
}

function saveInputProfile(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow(popupEditProfile);
}

popupEditProfileForm.addEventListener('submit', saveInputProfile);

function openModalWindow(popup) {
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
    resetValidation(popupAddProfileForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inactiveButtonClass: 'popup__btn-save_disabled',
        submitButtonSelector: '.popup__btn-save'
    });
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

function viewCard(e) {
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    popupTitle.textContent = e.target.alt;
    openModalWindow(popupView);
}

function createCard(name, link) {
    const newCard = template.content.cloneNode(true);
    const title = newCard.querySelector('.place-item__title');
    const imageUrl = newCard.querySelector('.place-item__image');
    title.textContent = name;
    imageUrl.src = link;
    imageUrl.alt = name;
    const likeButton = newCard.querySelector('.place-item__like');
    likeButton.addEventListener('click', clickLikeButton);
    const removeButton = newCard.querySelector('.place-item__bin');
    removeButton.addEventListener('click', clickDeleteCardButton);
    const card = newCard.querySelector('.place-item__image');
    card.addEventListener('click', viewCard);
    return newCard;
}

popupAddProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    listContainer.prepend(createCard(popupPlace.value, popupLink.value));
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


