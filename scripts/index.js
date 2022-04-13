//базовый  массив  карточек
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

//поля профиля, главная  страница
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
const popupPlace = popupAddCard.querySelector('.input-3');
const popupLink = popupAddCard.querySelector('.input-4');
const popupAddCloseButton = popupAddCard.querySelector('.popup__btn-close');
const popupAddSaveButton = popupAddCard.querySelector('.popup__btn-save');
const AddPlaceButton = document.querySelector('.profile__btn-add');

// для template
const listContainer = document.querySelector('.places__list');
const template = document.querySelector('.template');

// загрузка карточек из массива
function render() {
    const html = initialCards.map(getElement);
    listContainer.append(...html);

    for (let LikeBtn of document.querySelectorAll('.place-item__like')) {
        LikeBtn.addEventListener('click', function () {
            this.classList.toggle('place-item__like_active');
        });
    }

    for (let binBtn of document.querySelectorAll('.place-item__bin')) {
        binBtn.addEventListener('click', function () {
            this.parentElement.remove();
        });
    }
}

// лайки
function LikeBtnClick(e) {
    e.target.classList.toggle('place-item__like_active');
}
//корзина
function DeleteCardBtnClick(e) {
    e.target.parentElement.remove();
}

//клонирование template
function getElement(item) {
    const getElementTemplate = template.content.cloneNode(true);
    const title = getElementTemplate.querySelector('.place-item__title');
    const link = getElementTemplate.querySelector('.place-item__image');

    title.textContent = item.name;
    link.src = item.link;

    return getElementTemplate;
    //return LoadTemplate(item.name, item.link); //ПОДУМАТЬ КАК  СДЕЛАТЬ ОБЩИЙ!
}

render();

//загрузка полей  попапа рекдактировавния  профиля
function onLoad() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openModalWindow(popupEditProfile);
}

//загрузка полей импутов попапа рекдактировавния  профиля в поля профиля главное  странцы
function onSave(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow(popupEditProfile);
}

popupEditProfileForm.addEventListener('submit', onSave);

//общие для  всех попавов, агрументом передается  попап
function openModalWindow(popup) {
    popup.classList.add('popup_opened');
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_opened');
}

//открытие попапа рекдактировавния  профиля
popupOpenButton.addEventListener('click', onLoad);

//открытие попапа  редактирования карточки
AddPlaceButton.addEventListener('click', () => {
    openModalWindow(popupAddCard);
});

//закрытие попапа рекдактировавния  профиля
popupEditCloseButton.addEventListener('click', () => {
    closeModalWindow(popupEditProfile);
});
//закрытие попапа  редактирования карточки
popupAddCloseButton.addEventListener('click', () => {
    closeModalWindow(popupAddCard);
});


//клонирование  template
function LoadTemplate(name_, link_) {
    const getElementTemplate = template.content.cloneNode(true);
    const title = getElementTemplate.querySelector('.place-item__title');
    const link = getElementTemplate.querySelector('.place-item__image');

    title.textContent = name_.value;
    link.src = link_.value;

    //ДОБАВИТЬ ЛАЙКИ
    //getElementTemplate.querySelector('.card__like').addEventListener('click', LikeBtnClick);
    //ДОБАВИТЬ КОРЗИНУ
    //getElementTemplate.querySelector('.place-item__bin').addEventListener('click', DeleteCardBtnClick);

    return getElementTemplate;
}

//добавлние  карточки
popupAddSaveButton.addEventListener('click', (e) => {
    e.preventDefault();
    listContainer.append(LoadTemplate(popupPlace, popupLink));
    closeModalWindow(popupAddCard);
});



