import "./index.css"; //+

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
    popupEditAvatarButton,
    inputName,
    inputJob,
    baseUrl

} from "../utils/constants.js";

import Api from "../components/Api.js";
import PopupConfirm from "../components/СonfirmPopup.js";

const popupAddCard = new PopupWithForm('.popup_new-card', {
    formSelector: config.formSelector,
    inputSelector: config.inputSelector,
    submitButtonSelector: config.submitButtonSelector,
}, createNewCard);

const userInfo = new UserInfo(
    profileConfig.nameSelector,
    profileConfig.jobSelector,
    profileConfig.imgSelector
);

const popupAvatar = new PopupWithForm( '.popup_edit-avatar', {
    formSelector: config.formSelector,
    inputSelector: config.inputSelector,
    submitButtonSelector: config.submitButtonSelector,
},  saveAvatarProfile);

const popupEditProfile = new PopupWithForm('.popup_edit-profile', {
    formSelector: config.formSelector,
    inputSelector: config.inputSelector,
    submitButtonSelector: config.submitButtonSelector,
}, saveInputProfile);

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
const formEditAvatarValidator = new FormValidator(config, popupAvatar.getForm());


const api = new Api({
    baseUrl: baseUrl,
    headers: {
        authorization: '542751f4-2e93-4fad-82e3-6e5a73ce5b6d',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo({name: userData.name, job: userData.about, avatar: userData.avatar, _id: userData._id});
        listContainer.renderItems(cards.reverse());
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
    popupEditProfile.setSubmitText("Сохранение...");

    api.sendUserInfo(inputsValues["input-title"], inputsValues["input-job"])
        .then((userData) => {
            userInfo.setUserInfo({name: userData.name, job: userData.about, avatar: userData.avatar});
            popupEditProfile.close();
        })

        .finally(() => {
            popupEditProfile.setSubmitText("Сохранить");
        })

        .catch((err) => {
            console.log(err);
        });
}

function createNewCard(event, inputsValues) {
    event.preventDefault();
    popupAddCard.setSubmitText("Сохранение...");

    api.addNewCard(inputsValues["input-place"], inputsValues["input-link"])
        .then((card) => {
            listContainer.addItem(addCard(card.link, card.name, card.likes,  card._id, card.owner));
            popupAddCard.close();
        })

        .finally(() => {
            popupAddCard.setSubmitText("Создать");
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

function saveAvatarProfile(event, inputsValues) {
    event.preventDefault();
    popupAvatar.setSubmitText("Сохранение...");

    api.changeAvatar(inputsValues["avatar-link"])
        .then((userData) => {
            userInfo.setUserInfo({avatar: userData.avatar});
            popupAvatar.close();
        })

        .finally(() => {
            popupAvatar.setSubmitText("Сохранить");
        })

        .catch((err) => {
            console.log(err);
        });
}

function clickChangeAvatar() {
    formEditValidator.resetValidation();
    popupAvatar.open()
}

popupView.setEventsListeners();
popupEditProfile.setEventsListeners();
popupAddCard.setEventsListeners();
popupAvatar.setEventsListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formEditAvatarValidator.enableValidation();

popupOpenButton.addEventListener('click', loadInputProfile);
popupEditAvatarButton.addEventListener('click', clickChangeAvatar);

buttonAddCard.addEventListener('click', () => {
    formAddValidator.resetValidation();
    popupAddCard.open();
});

popupDeleteCard.setEventsListeners();


