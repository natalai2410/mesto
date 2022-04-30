function showError(input, config) {
    const errorElement = document.querySelector(`#${input.id}-error`);

    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
}

function hideError(input, config) {
    const errorElement = document.querySelector(`#${input.id}-error`);

    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

function toggleButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function handleFormInput(input, form, config) {
    if (!input.validity.valid) {
        showError(input, config);
    } else {
        hideError(input, config);
    }
    toggleButtonState(form, config);
}

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
        toggleButtonState(form, config);
        form.addEventListener('input', (event) => {
            handleFormInput(event.target, form, config);
        });
    });
}

function resetValidation(form, config) {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach(input => {
        hideError(input, config);
    });
    toggleButtonState(form, config);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inactiveButtonClass: 'popup__btn-save_disabled',
    submitButtonSelector: '.popup__btn-save'
});

