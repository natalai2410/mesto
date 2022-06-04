export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    _handleClosePopup = (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('popup__btn-close')) {
            this.close();
        }
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }


    setEventsListeners() {
        this._popup.addEventListener('click', this._handleClosePopup);
    }
}