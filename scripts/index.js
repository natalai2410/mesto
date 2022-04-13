const content = document.querySelector('.content');

const profile = content.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const popupOpenButton = profile.querySelector('.profile__btn-edit');

// попап рекдактировавния  профиля
const popupEditProfile = document.querySelector('.edit_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfile.querySelector('.popup__input-Title');
const inputJob = popupEditProfile.querySelector('.popup__input-SubTitle');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__btn-close');

// попап додавление  карточки
const popupAddCard = document.querySelector('.new_card');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const popupPlace = popupAddCard.querySelector('.input-3');
const popupLink = popupAddCard.querySelector('.input-4');
const popupAddCloseButton = popupAddCard.querySelector('.popup__btn-close');
const AddPlaceButton = document.querySelector('.profile__btn-add');

function onLoad() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openModalWindow(popupEditProfile);
}

function onSave(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow();
}

function openModalWindow(popup) {
    popup.classList.add('popup_opened');
}
function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
}

popupEditProfileForm.addEventListener('submit', onSave);

popupOpenButton.addEventListener('click',onLoad );
AddPlaceButton.addEventListener('click', ()=> {
    openModalWindow(popupAddCard);
});

popupEditCloseButton.addEventListener('click', () => {
    closeModalWindow(popupEditProfile);
});
popupAddCloseButton.addEventListener('click', () => {
    closeModalWindow(popupAddCard);
});



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

const listContainer = document.querySelector('.places__list');
const template = document.querySelector('.template');

// загрузка карточек из массива
function render() {
    const html = initialCards.map(getElement);
    listContainer.append(...html);
}

function getElement(item) {
    const getElementTemplate = template.content.cloneNode(true);
    const title = getElementTemplate.querySelector('.place-item__title');
    title.textContent = item.name;
    const link = getElementTemplate.querySelector('.place-item__image');
    link.src = item.link;
    return getElementTemplate;
}

render();

// добавление  лайков
for (let LikeBtn of document.querySelectorAll('.place-item__like')) {
    LikeBtn.addEventListener('click', function () {
        this.classList.toggle('place-item__like_active');
    });
}


