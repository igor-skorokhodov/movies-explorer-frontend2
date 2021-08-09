const adress = 'https://api.nomoreparties.co';

export class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo() {
        //подгрузили инфу о пользователе из сервера
        return fetch(this._url + `users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => this._getResponseData(res));
    }

    updateUserInfo(name, email) {
        //загрузили инфу о пользователе на сервер
        return fetch(this._url + "users/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        }).then((res) => this._getResponseData(res));
    }

    getMovies() {
        //загрузили все карточки
        return fetch(this._url + "movies", {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    addMovie(data, id) {
        //добавили карточку
        return fetch(this._url + "movies", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `${adress}${data.image.url}`,
                trailer: data.trailerLink,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                thumbnail: `${adress}${data.image.url}`,
                movieId: data.id,
                owner: id,
            }),
        }).then((res) => this._getResponseData(res));
    }

    removeMovie(id) {
        //удалили карточку
        return fetch(`${this._url}movies/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.message}`);
        }
        return res.json();
    }
}
const config = {
    url: "https://api.ivladsk.nomoredomains.club/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

const mainApi = new MainApi(config);

export default mainApi;