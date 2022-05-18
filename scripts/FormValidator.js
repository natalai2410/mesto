export default class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass= config.errorClass;

        this._inactiveButtonClass = config.inactiveButtonClass;
        this._submitButtonSelector = config.submitButtonSelector;

        this._form = form;

        this._button = this._form.querySelector(this._submitButtonSelector);
        this._inputs =  Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _showError = (input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);

        errorElement.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = input.validationMessage;
    };


    _hideError = (input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);

        errorElement.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };

    _toggleButtonState = () => {
        this._button.disabled = !this._form.checkValidity();
        this._button.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
    };

    _handleFormInput = (input) => {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
        this._toggleButtonState();
    };

    _resetInputs = () => {
        this._inputs.forEach((input) => {
            this._hideError(input);
        });
    };

    _setEventListeners = () => {
        this._form.addEventListener('input', (event) => {
            this._handleFormInput(event.target);
        });
    };

    enableValidation = () => {
        this._toggleButtonState();
        this._setEventListeners();
    };

    resetValidation = () => {
        this._resetInputs();
        this._toggleButtonState();
    }
}