class MoviesApi {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.cachedMovies = null;
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getMoviesList() {
        if (this.cachedMovies) {
            return Promise.resolve(this.cachedMovies);
        }
        return fetch(this.baseUrl, {
            headers: this.headers
        })
            .then((res) => {
                const films = this._getResponseData(res);
                this.cachedMovies = films;
                return films;
            });
    }

}

const apiOther = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiOther;