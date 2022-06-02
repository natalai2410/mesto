//отвечает за открытие и закрытие попапа.
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    //закрытия попапа клавишей Esc.
    _handleEscClose(e){
        if ( e.key === "Escape") {
            this.close();
        }
    }

    //закрытия попапа оверлей
    _handleClosePopup = (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('popup__close-btn')) {
            this.close();
        }
    };

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }


    //слушатель на кнопку
    setEventsListeners() {
        this._popupSelector.addEventListener('click', this._handleClosePopup);
    }

}