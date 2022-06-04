import Popup from "./Popup.js";

export  default class PopupWithForm extends Popup {
    //popupSubmit  колбэк сабмита формы.

    ///    formSelector: '.popup__form',
    //     inputSelector: '.popup__input',
    constructor(popupSelector, {formSelector, inputSelector}, popupSubmit) {
        super(popupSelector);

        this._formPopup = this._popup.querySelector(formSelector);
        this._inputs = Array.from(this._formPopup.querySelectorAll(inputSelector));

        this._popupSubmit = popupSubmit;

    }

    //собирает данные всех полей формы.
    _getInputValues() {
        this._inputsValues = {}; //пустой объект

        this._inputs.forEach((input) => { // пробегаемся по всем импутам формы и записвам в name value
            this._inputsValues[input.name] = input.value;
        });
    }

    setEventsListeners() {
        super.setEventsListeners();

        this._formPopup.addEventListener("submit", (e) => {
            this._getInputValues();
            this._popupSubmit(e, this._inputsValues);
            this.close();
        });
    }

    getForm() {
        return this._formPopup;
    }

    close() {
        this._formPopup.reset(); //сброс
        super.close();
    }
}