//отвечает за открытие и закрытие попапа.
export default class Popup {
    constructor(popupSelector) {
        //this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }

    //закрытия попапа клавишей Esc.
    _handleEscClose(e){
        if ( e.key === "Escape") {
            this.close();
        }
    }

    //закрытия попапа оверлей
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


    //слушатель на кнопку
    setEventsListeners() {
        //находим в _popup кнопку и устанавливаем ей слушатель _handleClosePopup
        this._popup.addEventListener('click', this._handleClosePopup);
    }
}