export default class Card {
    constructor(link, name, likes , templateSelector, handleOpenImage ) {
        this._name = name;
        this._link = link;
        this._cardSelector = templateSelector;
        this._handleOpenImage = handleOpenImage;

        this._likes = likes;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector).content.querySelector('.place-item').cloneNode(true);
    }

    _likeButtonClick = () => {
        this._btnLikeCard.classList.toggle('place-item__like_active');
    };

    _binButtonClick() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._btnLikeCard.addEventListener("click", () =>  this._likeButtonClick());

        this._element.querySelector('.place-item__bin').addEventListener('click', () => {
            this._binButtonClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleOpenImage({ link: this._link, name: this._name, like: this._likes });
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._btnLikeCard = this._element.querySelector(".place-item__like");
        this._cardImage = this._element.querySelector(".place-item__image");
        this._countLikesCard = this._element.querySelector(".place-item__count-like");

        this._setEventListeners();

        this._element.querySelector('.place-item__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._countLikesCard.textContent = this._likes.length;

        return this._element;
    }
}
