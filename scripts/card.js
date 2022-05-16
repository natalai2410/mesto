import {popupImage, popupTitle, popupView, openModalWindow} from './index.js';

export default class Card {
    constructor(link, name, _handleOpenPopup) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        return document
            .querySelector('.template')
            .content
            .querySelector('.place-item')
            .cloneNode(true);
    }

    _likeButtonClick() {
        this._element.querySelector('.place-item__like').classList.toggle('place-item__like_active');
    }

    _binButtonClick() {
        this._element.closest('.place-item').remove();
    }

    _handleOpenPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupTitle.textContent = this._name;
        openModalWindow(popupView);
    }

    _setEventListeners() {
        this._element.querySelector('.place-item__like').addEventListener('click', () => {
            this._likeButtonClick();
        });

        this._element.querySelector('.place-item__bin').addEventListener('click', () => {
            this._binButtonClick();
        });

        this._element.addEventListener('click', () => {
            this._handleOpenPopup(this._link,this._name );
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners(); // добавим обработчики

        this._element.querySelector('.place-item__title').textContent = this._name;
        this._element.querySelector('.place-item__image').src = this._link;
        this._element.querySelector('.place-item__image').alt = this._name;

        return this._element;
    }

}
