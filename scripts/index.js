const popupOpen = document.querySelector('.profile__btn-edit');
const popupClose = document.querySelector('.popup__btn-close');
const popupOpened = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const avatarTitleBody = document.querySelector('.profile__title');
const avatarSubtitleBody = document.querySelector('.profile__subtitle');
const avatarTitle = document.getElementById('input-1');
const avatarSubTitle = document.getElementById('input-2');
function onLoad() {
    avatarTitle.value = avatarTitleBody.textContent;
    avatarSubTitle.value = avatarSubtitleBody.textContent;
}
function onSave(e) {
    e.preventDefault();
    avatarTitleBody.textContent = avatarTitle.value;
    avatarSubtitleBody.textContent = avatarSubTitle.value;
    CloseModalWindow();
}
popupForm.addEventListener('submit', onSave);
function OpenModalWindow() {
    popupOpened.classList.add('popup_opened');
    onLoad();
}
function CloseModalWindow() {
    popupOpened.classList.remove('popup_opened');
}
popupOpen.addEventListener('click', OpenModalWindow);
popupClose.addEventListener('click', CloseModalWindow);
for (let LikeBtn of document.querySelectorAll('.place-item__like')) {
    LikeBtn.addEventListener('click', function () {
        this.classList.toggle('place-item__like_active');
    });
}

