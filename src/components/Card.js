export default class Card {
    constructor( link, name, likes, _id, owner , templateSelector, handleOpenImage, handleClickBin, putLikeClick, deleteLikeClick) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._id = _id;
        this._owner = owner;

        this._cardSelector = templateSelector;

        this._handleOpenImage = handleOpenImage;
        this._handleClickBin = handleClickBin;

        this._putLikeClick = putLikeClick;
        this._deleteLikeClick = deleteLikeClick;
    }

    getID() {
        return this._id;
    }

    _getOwnerId() {
        return this._owner._id;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector).content.querySelector('.place-item').cloneNode(true);
    }

    _likeCard = () => {
        if (this._isLiked) {
            this._deleteLikeClick(this);
        } else {
            this._putLikeClick(this);
        }
    };

    _likeButtonClick = () => {
        this._btnLikeCard.classList.toggle('place-item__like_active');
        this._isLiked = !this._isLiked;
    };


    _recentlyLikes(userId) {
        if(this._likes.find(element => {
            return element._id === userId
        })) {
            this._likeButtonClick();
        }
    }

    updateCardLike(card) {
        this._likes = card.likes;
        this._countLikesCard.textContent = this._likes.length;

        this._likeButtonClick();
    }

    binButtonClick = () => {
        this._element.remove();
        this._element = null;
    };

    _setEventListeners() {
        //this._btnLikeCard.addEventListener("click", () =>  this._likeButtonClick());
        this._btnLikeCard.addEventListener("click", () =>  this._likeCard());

        this._element.querySelector('.place-item__bin').addEventListener('click', () => {
            //this._binButtonClick();
            this._handleClickBin(this);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleOpenImage({ link: this._link, name: this._name });
        });
    }

    generateCard(userId) {
        this._element = this._getTemplate();

        this._btnLikeCard = this._element.querySelector(".place-item__like");
        this._btnRemoveCard = this._element.querySelector(".place-item__bin");
        this._cardImage = this._element.querySelector(".place-item__image");
        this._countLikesCard = this._element.querySelector(".place-item__count-like");

        this._setEventListeners();

        this._element.querySelector('.place-item__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._countLikesCard.textContent = this._likes.length;
        this._recentlyLikes(userId);

        if (userId !== this._getOwnerId()) {
            this._btnRemoveCard.classList.add("place-item__bin_disabled");
        }

        return this._element;
    }
}
