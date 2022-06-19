export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch('https://nomoreparties.co/v1/cohort-43/cards', {
            headers: this._headers,
        })
            .then(result => {
                if (result.ok) {
                    console.log(result);
                    return result.json();
                }
                return Promise.reject(`Ошибка: ${result.statusText}`);
            })
    }

    getUserInfo = () => {
        return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
            headers: this._headers,
        })
            .then(result => {
            if (result.ok) {
                console.log(result);
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.statusText}`);
        });
    }
}
