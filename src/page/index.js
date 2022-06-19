// import "./index.css"; //+

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    config,
    profileConfig,
    popupViewConfig,
    popupOpenButton,
    buttonAddCard,
    inputName,
    inputJob

} from "../utils/constants.js";

import Api from "../components/Api.js";



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
    profileConfig.jobSelector,
    profileConfig.imgSelector
    );

const popupView = new PopupWithImage('.popup_view-card',
    popupViewConfig);

const listContainer = new Section((card) => {
    listContainer.addItem(addCard(card.link, card.name));
}, ".places__list");

const formAddValidator = new FormValidator(config, popupAddCard.getForm());
const formEditValidator = new FormValidator(config, popupEditProfile.getForm());


const api = new Api({
    baseUrl: '',
    headers: {
        authorization: '542751f4-2e93-4fad-82e3-6e5a73ce5b6d',
        'Content-Type': 'application/json'
    }
});


Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({name: userData.name, job: userData.about, img: userData.avatar});
        listContainer.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });

function addCard(link, name) {
    const card = new Card(link, name, '#template-place-item', popupView.open);
    return card.generateCard();
}

function loadInputProfile() { //+
    const userObject = userInfo.getUserInfo();
    inputName.value = userObject.name;
    inputJob.value = userObject.job;
    formEditValidator.resetValidation();
    popupEditProfile.open()
}

function saveInputProfile(event, inputsValues) {
    event.preventDefault();
    api.sendUserInfo( inputsValues["input-title"], inputsValues["input-job"])
        .then((userData) => {
            console.log(userData);
            userInfo.setUserInfo({name: userData.name, job: userData.about, img: userData.avatar});
        })
        .catch((err) => {
            console.log(err);
        });
}

function createNewCard(inputsValues) {
    listContainer.addItem(
        addCard(inputsValues["input-link"], inputsValues["input-place"])
    );
}

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




