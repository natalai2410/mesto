import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, { formSelector }, clickDeleteCard) {
        super(popupSelector);

        this._formSelector = formSelector;
        this._clickDeleteCard = clickDeleteCard;

        this._form = this._popup.querySelector(this._formSelector);
    }

    _clickConfirmRemove = (event) => {
        event.preventDefault();
        this._clickDeleteCard(this._card);
    };

    open = (card) => {
        this._card = card;
        super.open();
    };

    setEventsListeners() {
        super.setEventsListeners();
        this._form.addEventListener('submit', this._clickConfirmRemove);
    }

}
