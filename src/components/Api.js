export  default class Api {
    constructor(options) {
        // тело конструктора
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    loadCard() {
        return fetch('https://nomoreparties.co/v1/cohort-43/cards',  {
            headers: {
                authorization: '542751f4-2e93-4fad-82e3-6e5a73ce5b6d'
            },
        }).then(result => {
            if (result.ok) {
                console.log(result);
                return result.json();
            }
            return Promise.reject(`Ошибка: ${result.statusText}`);
        })
    }

    // getInitialCards =() => {
    //     this._loadCard('cards')
    //         .then((res) => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             return Promise.reject(res.status);
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(`Ошибка: ${err}`);
    //         });
    // };

    // другие методы работы с API

    // передаем url и заголовок
    getUserInfo = () => {
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
