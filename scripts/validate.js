// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// });


//выбираем форму  с импутами, присваивем ей константу formElement
const form = document.querySelector('.popup__form');
// в formElement  выбираем импут
const formInput = form.querySelector('.popup__input');
//сообщения  оь ошибке
//formError = formElement.querySelector(`.${formInput.id}-error`);



//функция showError передаёт событию input класс form__input_type_error, класс с ошибкой
//входное  поле input формы   и сообщение  об ошибке
const showError = (formElement, inputElement, errorMessage) => {

    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');

    //текст ошибки
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

//функция hideError передаёт событию input класс form__input_type_error, класс с ошибкой
const hideError = (formElement, inputElement) => {

    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

//фунция  проверяет поле  на ошибку
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {  //передаем input
        // Если поле не проходит валидацию, покажем ошибку
        showError(formElement, inputElement,  inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        hideError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
        });
    });
};
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

//enableValidation();

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save',
    inactiveButtonClass: '.form__save_disabled',
    inputErrorClass: '.form__input_type_error',
    errorClass: '.form__error_visible'
});


