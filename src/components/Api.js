export  default class Api {
    constructor(options) {
        // тело конструктора
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        // ...
    }

    // другие методы работы с API

    // передаем url и заголовок
    getUserInfo = () => {
        //return fetch('https://nomoreparties.co/v1/cohort-43/users/me', { так  работает
        //return fetch(`${this._baseUrl}`, {
        return fetch(this._baseUrl, {
            headers:
            this._headers,

        }).then(result => {
            if (result.ok) {
                console.log(result);
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.statusText}`);
        });
    }
}

// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//     headers: {
//         authorization: '542751f4-2e93-4fad-82e3-6e5a73ce5b6d',
//         'Content-Type': 'application/json'
//     }
// });