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
import PopupConfirm from "../components/СonfirmPopup.js";

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


const popupDeleteCard = new PopupConfirm('.popup_delete-card',
    config,
    clickDeleteCard
);


const listContainer = new Section((card) => {
    listContainer.addItem(addCard(card.link, card.name, card.likes, card._id, card.owner));
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
        userInfo.setUserInfo({name: userData.name, job: userData.about, img: userData.avatar, _id: userData._id});
        listContainer.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });



function addCard(link, name, likes, _id, owner) {
    const card = new Card(link, name, likes, _id, owner,
        '#template-place-item',
        popupView.open,
        popupDeleteCard.open,
        putLikeClick,
        deleteLikeClick);
    return card.generateCard(userInfo.getId());
}

function putLikeClick(card) {
    api.putLike(card.getID())
        .then((data) => {
            card.updateCardLike(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteLikeClick(card) {
    api.deleteLike(card.getID())
        .then((data) => {
            card.updateCardLike(data);
        })
        .catch((err) => {
            console.log(err);
        });
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
    api.sendUserInfo(inputsValues["input-title"], inputsValues["input-job"])
        .then((userData) => {
            console.log(userData);
            userInfo.setUserInfo({name: userData.name, job: userData.about, img: userData.avatar});
        })
        .catch((err) => {
            console.log(err);
        });
}

function createNewCard(event, inputsValues) {
    event.preventDefault();
    api.addNewCard(inputsValues["input-place"], inputsValues["input-link"])
        .then((card) => {
            // console.log(card.name);
            addCard(card.link, card.name, card.likes,  card._id, card.owner);
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
}


function clickDeleteCard(card) {
    api.deleteCard(card.getID())
        .then(() => {
            card.binButtonClick();
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(err);
        });

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


popupDeleteCard.setEventsListeners();

