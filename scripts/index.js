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
const inputJob = popupEditProfile.querySelector('.popup__input_subTitle');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__btn-close');

const popupAddCard = document.querySelector('.popup_new-card');
const popupAddProfileForm = popupAddCard.querySelector('.popup__form');
const popupPlace = popupAddCard.querySelector('.popup__input_place');
const popupLink = popupAddCard.querySelector('.popup__input_link');
const popupAddCloseButton = popupAddCard.querySelector('.popup__btn-close');
const popupAddSaveButton = popupAddCard.querySelector('.popup__btn-save');
const AddPlaceButton = document.querySelector('.profile__btn-add');

const popupView = document.querySelector('.popup_view-card');
const popupImage = popupView.querySelector('.popup__image');
const popupTitle = popupView.querySelector('.popup__caption');
const popupViewCloseButton = popupView.querySelector('.popup__btn-close');

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
    //e.target.removeEventListener('click', clickLikeButton);
    e.target.parentElement.remove();
}

window.onload = function () {
    loadCards();
};

function onLoad() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openModalWindow(popupEditProfile);
}

function onProfileSave(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow(popupEditProfile);
}

popupEditProfileForm.addEventListener('submit', onProfileSave);

function openModalWindow(popup) {
    popup.classList.add('popup_opened');
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', onLoad);

AddPlaceButton.addEventListener('click', () => {
    popupAddProfileForm.reset();
    openModalWindow(popupAddCard);
});

popupEditCloseButton.addEventListener('click', () => {
    closeModalWindow(popupEditProfile);
});

popupAddCloseButton.addEventListener('click', () => {
    closeModalWindow(popupAddCard);
});

popupViewCloseButton.addEventListener('click', () => {
    document.querySelector(".page").style.overflowY = "inherit";
    closeModalWindow(popupView);
});

function CardView(e) {
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    popupTitle.textContent = e.target.alt;
    document.querySelector(".page").style.overflowY = "hidden";
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
    const Card = newCard.querySelector('.place-item__image');
    Card.addEventListener('click', CardView);
    return newCard;
}

popupAddSaveButton.addEventListener('click', (e) => {
    e.preventDefault();
    listContainer.prepend(createCard(popupPlace.value, popupLink.value));
    closeModalWindow(popupAddCard);
});



