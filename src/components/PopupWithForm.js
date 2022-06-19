import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSelector, inputSelector}, popupSubmit) {
        super(popupSelector);

        this._formPopup = this._popup.querySelector(formSelector);
        this._inputs = Array.from(this._formPopup.querySelectorAll(inputSelector));

        this._popupSubmit = popupSubmit;

    }

    _getInputValues() {
        this._inputsValues = {};

        this._inputs.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });

        return this._inputsValues;
    }

    setEventsListeners() {
        super.setEventsListeners();

        this._formPopup.addEventListener("submit", (e) => {
            this._popupSubmit(e, this._getInputValues());
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