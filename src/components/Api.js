export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _returnResult(result) {
        if (result.ok) {
            console.log(result);
            return result.json();
        }
        return Promise.reject(`Упс... Что-то пошло не так: ${result.statusText}`);
    }

    getInitialCards() {
        return fetch('https://nomoreparties.co/v1/cohort-43/cards', {
            headers: this._headers,
        })
            .then(result => {
                return this._returnResult(result);
            })
    }

    getUserInfo = () => {
        return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
            headers: this._headers,
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    sendUserInfo = (name, job) => {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(result => {
                return this._returnResult(result);
            })
    };


    addNewCard = (name, link) => {
         return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(result => {
                return this._returnResult(result);
            })
    };
}
