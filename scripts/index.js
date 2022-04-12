const popupOpenButton = document.querySelector('.profile__btn-edit');
const popupCloseButton = document.querySelector('.popup__btn-close');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = document.getElementById('input-1');
const inputJob = document.getElementById('input-2');

function onLoad() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function onSave(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModalWindow();
}

function openModalWindow() {
    popup.classList.add('popup_opened');
    onLoad();
}

function closeModalWindow() {
    popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closeModalWindow);
popupForm.addEventListener('submit', onSave);
popupOpenButton.addEventListener('click', openModalWindow);


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

function render() {
    const html = initialCards.map(getElement);
    console.log(getElement.name);
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