import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
    initialCards,
    config,
    profileConfig,
    popupViewConfig,
    popupOpenButton,
    buttonAddCard,
    inputName,
    inputJob

} from "../utils/constants.js";

const popupEditProfile = new PopupWithForm('.popup_edit-profile', {
    formSelector: config.formSelector,
    inputSelector: config.inputSelector
}, saveInputProfile);

const popupAddCard = new PopupWithForm('.popup_new-card', {
    formSelector: config.formSelector,
    inputSelector: config.inputSelector
}, createNewCard);

const userInfo = new UserInfo(
    profileConfig.nameSelector,
    profileConfig.jobSelector);

const popupView = new PopupWithImage('.popup_view-card',
    popupViewConfig);

const listContainer = new Section(
    {
        items: initialCards,
        renderer: (card) => {
            listContainer.addItem(addCard(card.link, card.name));
        },
    },
    ".places__list"
);

const formAddValidator = new FormValidator(config, popupAddCard.getForm());
const formEditValidator = new FormValidator(config, popupEditProfile.getForm());


function addCard(link, name) {
    const card = new Card(link, name, '#template-place-item', popupView.open);
    return card.generateCard();
}

function loadInputProfile() {
    const userObject = userInfo.getUserInfo();
    inputName.value = userObject.name;
    inputJob.value = userObject.job;
    formEditValidator.resetValidation();
    popupEditProfile.open()
}

function saveInputProfile(e, inputsValues) {
    e.preventDefault();
    userInfo.setUserInfo({name: inputsValues["input-title"], job: inputsValues["input-job"]});
}

function createNewCard(e, inputsValues) {
    e.preventDefault();
    listContainer.addItem(
        addCard(inputsValues["input-link"], inputsValues["input-place"])
    );
}

listContainer.renderItems();

popupView.setEventsListeners();
popupEditProfile.setEventsListeners();
popupAddCard.setEventsListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();

popupOpenButton.addEventListener('click', loadInputProfile);

buttonAddCard.addEventListener('click', () => {
    formAddValidator.resetValidation();
    popupAddCard.open();
});




