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

