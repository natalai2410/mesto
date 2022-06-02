//import {popupImage, popupTitle, popupView, openModalWindow} from './index.js';


export default class Card {
    constructor(link, name, templateSelector, handleOpenImage ) {
        this._name = name;
        this._link = link;
        this._cardSelector = templateSelector;
        this._handleOpenImage = handleOpenImage;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector).content.querySelector('.place-item').cloneNode(true);
    }

    _likeButtonClick = () => {
        this._btnLikeCard.classList.toggle('place-item__like_active');
    };

    _binButtonClick() {
        this._element.closest('.place-item').remove();
        this._element = null;
    }

    // _handleOpenPopup() {
    //     popupImage.src = this._link;
    //     popupImage.alt = this._name;
    //     popupTitle.textContent = this._name;
    //     openModalWindow(popupView);
    // }

    _setEventListeners() {
        this._btnLikeCard.addEventListener("click", () =>  this._likeButtonClick());

        this._element.querySelector('.place-item__bin').addEventListener('click', () => {
            this._binButtonClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleOpenImage({ link: this._link, name: this._name });
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._btnLikeCard = this._element.querySelector(".place-item__like");
        this._cardImage = this._element.querySelector(".place-item__image");

        this._setEventListeners();

        this._element.querySelector('.place-item__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        return this._element;
    }
}
